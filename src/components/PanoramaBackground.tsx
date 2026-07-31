"use client";

import { useEffect, useRef } from "react";

export default function PanoramaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl") as WebGLRenderingContext | null;
    if (!gl) {
      // Fallback: just show CSS background if WebGL not available
      return;
    }

    // ---- RESIZE ----
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // ---- SHADERS ----
    const vsSource = `
      attribute vec2 aPos;
      varying vec2 vUv;
      void main() {
        vUv = aPos * 0.5 + 0.5;
        gl_Position = vec4(aPos, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTex;
      uniform float uLon;   // horizontal rotation in radians
      uniform float uLat;   // vertical tilt in radians
      uniform float uFov;   // vertical FoV in radians
      uniform float uAspect;

      const float PI = 3.14159265358979;

      void main() {
        // Convert screen UV to view ray direction
        vec2 ndc = vUv * 2.0 - 1.0;
        ndc.x *= uAspect;

        float halfFov = uFov * 0.5;
        vec3 ray = normalize(vec3(ndc.x * tan(halfFov), ndc.y * tan(halfFov), 1.0));

        // Rotate by latitude (pitch)
        float cosLat = cos(uLat);
        float sinLat = sin(uLat);
        vec3 rayLat = vec3(
          ray.x,
          ray.y * cosLat - ray.z * sinLat,
          ray.y * sinLat + ray.z * cosLat
        );

        // Rotate by longitude (yaw)
        float cosLon = cos(uLon);
        float sinLon = sin(uLon);
        vec3 finalRay = vec3(
          rayLat.x * cosLon - rayLat.z * sinLon,
          rayLat.y,
          rayLat.x * sinLon + rayLat.z * cosLon
        );

        // Convert ray to equirectangular UV
        float lon = atan(finalRay.x, finalRay.z);
        float lat = asin(clamp(finalRay.y / length(finalRay), -1.0, 1.0));

        float u = (lon / (2.0 * PI)) + 0.5;
        float v = (lat / PI) + 0.5;

        gl_FragColor = texture2D(uTex, vec2(u, v));
      }
    `;

    function compileShader(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // ---- FULLSCREEN QUAD ----
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1,  -1, 1,
       1, -1,  1,  1,  -1, 1,
    ]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // ---- UNIFORMS ----
    const uTex    = gl.getUniformLocation(prog, "uTex");
    const uLon    = gl.getUniformLocation(prog, "uLon");
    const uLat    = gl.getUniformLocation(prog, "uLat");
    const uFov    = gl.getUniformLocation(prog, "uFov");
    const uAspect = gl.getUniformLocation(prog, "uAspect");

    // ---- TEXTURE ----
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // Placeholder 1×1 pixel while image loads
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([5, 8, 22, 255]));

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      gl!.bindTexture(gl.TEXTURE_2D, texture);
      gl!.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl!.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl!.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl!.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl!.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };
    img.src = "/server-panorama.jpg";

    gl.uniform1i(uTex, 0);

    // ---- MOUSE / TOUCH ----
    let targetLon = 3.2; // start facing server aisle
    let targetLat = 0.0;
    let currLon = 3.2;
    let currLat = 0.0;

    const onMouseMove = (e: MouseEvent) => {
      const cx = canvas.offsetWidth / 2;
      const cy = canvas.offsetHeight / 2;
      targetLon = 3.2 - ((e.clientX - cx) / cx) * 0.4;
      targetLat = ((e.clientY - cy) / cy) * 0.15;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches.length) return;
      const cx = canvas.offsetWidth / 2;
      const cy = canvas.offsetHeight / 2;
      targetLon = 3.2 - ((e.touches[0].clientX - cx) / cx) * 0.4;
      targetLat = ((e.touches[0].clientY - cy) / cy) * 0.15;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    // ---- RENDER LOOP ----
    let rafId: number;
    let autoPan = 0;

    const render = () => {
      rafId = requestAnimationFrame(render);
      autoPan -= 0.0004; // slow auto-rotate

      currLon += (targetLon - currLon) * 0.04;
      currLat += (targetLat - currLat) * 0.04;

      const aspect = canvas.width / canvas.height;
      gl!.uniform1f(uLon, currLon + autoPan);
      gl!.uniform1f(uLat, currLat);
      gl!.uniform1f(uFov, 1.2); // ~69° vertical FoV
      gl!.uniform1f(uAspect, aspect);

      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
    };
    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", resize);
      gl!.deleteTexture(texture);
      gl!.deleteBuffer(buf);
      gl!.deleteProgram(prog);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />
      {/* Readability overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/80 via-[#050816]/50 to-[#050816]/88 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/55 via-transparent to-[#050816]/55 z-10 pointer-events-none" />
      {/* Cyber scanlines */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,150,255,0.012) 2px, rgba(0,150,255,0.012) 4px)",
        }}
      />
    </div>
  );
}
