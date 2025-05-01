'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function StarfieldBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    let mouseX = 0;
    let mouseY = 0;
    let windowHalfX = WIDTH / 2;
    let windowHalfY = HEIGHT / 2;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.00035); // very dark fog for subtle space depth

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.1, 1000);
    camera.position.z = 300;

    // Stars Geometry
    const starCount = 15000;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = Math.random() * 2000 - 1000;
      positions[i * 3 + 1] = Math.random() * 2000 - 1000;
      positions[i * 3 + 2] = Math.random() * 2000 - 1000;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Star Material (soft cream tone)
    const material = new THREE.PointsMaterial({
      size: 1.2,
      transparent: true,
      opacity: 0.85,
      color: new THREE.Color('#EDE8D0'),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0x000000, 1); // pure black background
    container.appendChild(renderer.domElement);

    // Event Handlers
    const onMouseMove = (e) => {
      mouseX = e.clientX - windowHalfX;
      mouseY = e.clientY - windowHalfY;
    };

    const onWindowResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      windowHalfX = newWidth / 2;
      windowHalfY = newHeight / 2;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const t = clock.getElapsedTime();

      // Rotate the starfield very slowly for cosmic drift
      stars.rotation.y += 0.00015;
      stars.rotation.x += 0.00005;

      // Subtle camera float effect
      camera.position.x += (mouseX - camera.position.x) * 0.002;
      camera.position.y += (-mouseY - camera.position.y) * 0.002;
      camera.position.z = 300 + Math.sin(t * 0.3) * 2;

      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full min-h-screen overflow-hidden" />;
}
