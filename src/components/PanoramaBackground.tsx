"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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

    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    container.appendChild(renderer.domElement);

    // --- 2. ORBIT CONTROLS (360 Interactive Movement) ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false; // Disabled zoom to prevent disturbing page scroll
    controls.enablePan = false;
    controls.enableDamping = true; // Smooth momentum
    controls.dampingFactor = 0.05;

    // Auto 360 Rotation Speed
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;

    // --- 3. CREATE 360° PANORAMA SPHERE ---
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    // Invert Z-axis so mesh faces inward and text reads left-to-right correctly
    geometry.scale(1, 1, -1);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/server-panorama.jpg", () => {
      renderer.render(scene, camera);
    });

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // --- 4. ADD 3D GLOWING DATA PARTICLES ---
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

    // --- 5. ANIMATION LOOP ---
    let animId: number;
    function animate() {
      animId = requestAnimationFrame(animate);

      // Update 360 camera controls
      controls.update();

      // Slowly rotate particle field independently for realistic depth
      particleSystem.rotation.y += 0.0005;
      particleSystem.rotation.x += 0.0002;

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
      controls.dispose();
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
