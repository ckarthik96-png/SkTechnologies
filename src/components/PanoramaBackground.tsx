"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function PanoramaBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 0.01);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // --- SPHERE (inside-view panorama) ---
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // flip inside out

    const texture = new THREE.TextureLoader().load("/server-panorama.jpg", (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
    });

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // --- MOUSE TRACKING ---
    let targetLon = 0;
    let targetLat = 0;
    let currentLon = 0;
    let currentLat = 0;
    const MOUSE_SENSITIVITY = 18;
    const LAT_CLAMP = 25; // degrees up/down limit

    const onMouseMove = (e: MouseEvent) => {
      const cx = mount.clientWidth / 2;
      const cy = mount.clientHeight / 2;
      targetLon = -((e.clientX - cx) / cx) * MOUSE_SENSITIVITY;
      targetLat = ((e.clientY - cy) / cy) * MOUSE_SENSITIVITY * 0.4;
    };

    // Touch support
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length < 1) return;
      const cx = mount.clientWidth / 2;
      const cy = mount.clientHeight / 2;
      targetLon = -((e.touches[0].clientX - cx) / cx) * MOUSE_SENSITIVITY;
      targetLat = ((e.touches[0].clientY - cy) / cy) * MOUSE_SENSITIVITY * 0.4;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    // --- AUTO ROTATION ---
    let autoLon = 180; // start facing the server aisle

    // --- ANIMATION LOOP ---
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Slow auto-pan
      autoLon -= 0.018;

      // Smooth lerp toward mouse target
      currentLon += (targetLon - currentLon) * 0.05;
      currentLat += (targetLat - currentLat) * 0.05;

      const clampedLat = Math.max(-LAT_CLAMP, Math.min(LAT_CLAMP, currentLat));
      const lon = autoLon + currentLon;

      const phi = THREE.MathUtils.degToRad(90 - clampedLat);
      const theta = THREE.MathUtils.degToRad(lon);

      camera.lookAt(
        500 * Math.sin(phi) * Math.cos(theta),
        500 * Math.cos(phi),
        500 * Math.sin(phi) * Math.sin(theta)
      );

      renderer.render(scene, camera);
    };
    animate();

    // --- RESIZE HANDLER ---
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Gradient overlays for depth and readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/80 via-[#050816]/55 to-[#050816]/85 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/60 via-transparent to-[#050816]/60 z-10 pointer-events-none" />
      {/* Cyber scan-line effect */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,150,255,0.015) 2px, rgba(0,150,255,0.015) 4px)",
        }}
      />
    </div>
  );
}
