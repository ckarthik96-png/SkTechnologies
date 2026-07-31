"use client";

import { useEffect, useRef } from "react";

export default function PanoramaBackground() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    // ---- SIZE canvas to parent ----
    const setSize = () => {
      const w = wrap.clientWidth || window.innerWidth;
      const h = wrap.clientHeight || window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      if (glRef) glRef.viewport(0, 0, w, h);
    };

    let glRef: WebGLRenderingContext | null = null;

    const gl =
      (canvas.getContext("webgl", { alpha: false }) ||
        canvas.getContext("experimental-webgl", {
          alpha: false,
        })) as WebGLRenderingContext | null;

    if (!gl) return; // WebGL not supported – canvas stays hidden
    glRef = gl;

    // Initial size
    setSize();

    // ---- SHADERS ----
    const VS = `
      attribute vec2 aPos;
      varying vec2 vUv;
      void main(){
        vUv = aPos * 0.5 + 0.5;
        gl_Position = vec4(aPos, 0.0, 1.0);
      }`;

    const FS = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTex;
      uniform float uLon, uLat, uFov, uAsp;
      const float PI = 3.14159265;

      vec3 enhance(vec3 c){
        c *= 1.6;
        c = (c - 0.5)*1.3 + 0.5;
        float l = dot(c, vec3(0.299,0.587,0.114));
        c = mix(vec3(l), c, 1.45);
        c.b = min(c.b*1.15, 1.0);
        return clamp(c,0.0,1.0);
      }

      void main(){
        vec2 ndc = (vUv*2.0-1.0) * vec2(uAsp, 1.0);
        float f = tan(uFov*0.5);
        vec3 r = normalize(vec3(ndc*f, 1.0));

        // Pitch (lat)
        float cL=cos(uLat), sL=sin(uLat);
        r = vec3(r.x, r.y*cL - r.z*sL, r.y*sL + r.z*cL);

        // Yaw (lon)
        float cO=cos(uLon), sO=sin(uLon);
        r = vec3(r.x*cO - r.z*sO, r.y, r.x*sO + r.z*cO);

        float u = atan(r.x, r.z)/(2.0*PI) + 0.5;
        float v = asin(clamp(r.y/length(r),-1.0,1.0))/PI + 0.5;

        vec4 t = texture2D(uTex, vec2(u,v));
        gl_FragColor = vec4(enhance(t.rgb), 1.0);
      }`;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // ---- FULLSCREEN QUAD ----
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, 1,-1, 1,1, -1,1]),
      gl.STATIC_DRAW
    );
    const ap = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(ap);
    gl.vertexAttribPointer(ap, 2, gl.FLOAT, false, 0, 0);

    // ---- UNIFORMS ----
    const uTex = gl.getUniformLocation(prog, "uTex");
    const uLon = gl.getUniformLocation(prog, "uLon");
    const uLat = gl.getUniformLocation(prog, "uLat");
    const uFov = gl.getUniformLocation(prog, "uFov");
    const uAsp = gl.getUniformLocation(prog, "uAsp");
    gl.uniform1i(uTex, 0);

    // ---- TEXTURE ----
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([5, 10, 30, 255]));

    const img = new Image();
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };
    img.src = "/server-panorama.jpg";

    // ---- MOUSE / TOUCH ----
    let tLon = 3.2, tLat = 0.0, cLon = 3.2, cLat = 0.0;

    const onMouse = (e: MouseEvent) => {
      const cx = (wrap.clientWidth || window.innerWidth) / 2;
      const cy = (wrap.clientHeight || window.innerHeight) / 2;
      tLon = 3.2 - ((e.clientX - cx) / cx) * 0.45;
      tLat = ((e.clientY - cy) / cy) * 0.18;
    };
    const onTouch = (e: TouchEvent) => {
      if (!e.touches.length) return;
      const cx = (wrap.clientWidth || window.innerWidth) / 2;
      const cy = (wrap.clientHeight || window.innerHeight) / 2;
      tLon = 3.2 - ((e.touches[0].clientX - cx) / cx) * 0.45;
      tLat = ((e.touches[0].clientY - cy) / cy) * 0.18;
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });

    // ---- RESIZE OBSERVER (most reliable) ----
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(setSize);
      ro.observe(wrap);
    } else {
      window.addEventListener("resize", setSize);
    }

    // ---- RENDER LOOP ----
    let raf: number;
    let pan = 0;

    const render = () => {
      raf = requestAnimationFrame(render);
      pan -= 0.0003;
      cLon += (tLon - cLon) * 0.04;
      cLat += (tLat - cLat) * 0.04;
      const asp = canvas.width / Math.max(canvas.height, 1);
      gl.uniform1f(uLon, cLon + pan);
      gl.uniform1f(uLat, cLat);
      gl.uniform1f(uFov, 1.15);
      gl.uniform1f(uAsp, asp);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", setSize);
      ro?.disconnect();
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Direct Image Fallback so background is NEVER blank */}
      <img
        src="/server-panorama.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        style={{ filter: "brightness(1.3) contrast(1.2)" }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block", position: "absolute", inset: 0 }}
      />

      {/* Dark gradient top & bottom for text readability */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,8,22,0.65) 0%, rgba(5,8,22,0.20) 40%, rgba(5,8,22,0.20) 60%, rgba(5,8,22,0.70) 100%)",
        }}
      />
      {/* Side vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(5,8,22,0.35) 0%, transparent 30%, transparent 70%, rgba(5,8,22,0.35) 100%)",
        }}
      />
      {/* Cyber scanlines */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,160,255,0.018) 2px, rgba(0,160,255,0.018) 4px)",
        }}
      />
    </div>
  );
}
