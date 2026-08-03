"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function PanoramaBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. INITIALIZE SCENE & CAMERA ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 0.1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ensure canvas stretches properly
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    container.appendChild(renderer.domElement);

    // --- 2. CREATE 360° PANORAMA SPHERE ---
    const geometry = new THREE.SphereGeometry(500, 60, 40);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/server-panorama.jpg", () => {
      renderer.render(scene, camera);
    });

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide, // Render interior faces naturally without flipping texture
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // --- 3. ADD 3D FLOATING CYBER PARTICLES ---
    const particleCount = 400;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00f0ff);
    const purpleColor = new THREE.Color(0x9d00ff);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;

      const mixedColor = cyanColor.clone().lerp(purpleColor, Math.random());
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // --- 4. ROTATION CONTROL (AUTO-ROTATE + MOUSE DRAG & PAN) ---
    let isUserInteracting = false;
    let onPointerDownPointerX = 0;
    let onPointerDownPointerY = 0;
    let onPointerDownLon = 0;
    let onPointerDownLat = 0;
    let lon = 0; // Directly face the 2 technicians in the server aisle
    let lat = 0;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      isUserInteracting = true;
      const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
      const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;
      onPointerDownPointerX = clientX;
      onPointerDownPointerY = clientY;
      onPointerDownLon = lon;
      onPointerDownLat = lat;
    };

    const onPointerMove = (event: MouseEvent | TouchEvent) => {
      if (!isUserInteracting) return;
      const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
      const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;
      lon = (onPointerDownPointerX - clientX) * 0.1 + onPointerDownLon;
      lat = (clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
    };

    const onPointerUp = () => {
      isUserInteracting = false;
    };

    const domElement = renderer.domElement;
    domElement.style.cursor = "grab";

    domElement.addEventListener("mousedown", onPointerDown as EventListener);
    window.addEventListener("mousemove", onPointerMove as EventListener);
    window.addEventListener("mouseup", onPointerUp);

    domElement.addEventListener("touchstart", onPointerDown as EventListener, { passive: true });
    window.addEventListener("touchmove", onPointerMove as EventListener, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // --- 5. ANIMATION LOOP ---
    let animId: number;

    function animate() {
      animId = requestAnimationFrame(animate);

      if (!isUserInteracting) {
        lon += 0.05; // Smooth slow auto rotation
      }

      lat = Math.max(-85, Math.min(85, lat));
      const phi = THREE.MathUtils.degToRad(90 - lat);
      const theta = THREE.MathUtils.degToRad(lon);

      const targetVector = new THREE.Vector3(
        500 * Math.sin(phi) * Math.cos(theta),
        500 * Math.cos(phi),
        500 * Math.sin(phi) * Math.sin(theta)
      );

      camera.lookAt(targetVector);

      // Rotate particle field
      particleSystem.rotation.y += 0.001;
      particleSystem.rotation.x += 0.0004;

      renderer.render(scene, camera);
    }

    animate();

    // --- 6. RESPONSIVE RESIZING ---
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      domElement.removeEventListener("mousedown", onPointerDown as EventListener);
      window.removeEventListener("mousemove", onPointerMove as EventListener);
      window.removeEventListener("mouseup", onPointerUp);
      domElement.removeEventListener("touchstart", onPointerDown as EventListener);
      window.removeEventListener("touchmove", onPointerMove as EventListener);
      window.removeEventListener("touchend", onPointerUp);

      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Readability gradient overlays */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,8,22,0.65) 0%, rgba(5,8,22,0.25) 40%, rgba(5,8,22,0.25) 60%, rgba(5,8,22,0.75) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(5,8,22,0.35) 0%, transparent 30%, transparent 70%, rgba(5,8,22,0.35) 100%)",
        }}
      />
    </div>
  );
}
