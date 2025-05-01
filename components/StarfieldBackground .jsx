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

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.00035);

    // Camera
    const camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.1, 1000);
    camera.position.z = 300;

    // Geometry
    const starCount = 15000;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = Math.random() * 2000 - 1000;
      positions[i * 3 + 1] = Math.random() * 2000 - 1000;
      positions[i * 3 + 2] = Math.random() * 2000 - 1000;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Material
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
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);

    // Drift control
    let isMouseMoving = false;
    let lastMouseMoveTime = Date.now();
    let driftSpeed = 0.8;

    const onMouseMove = (e) => {
      mouseX = e.clientX - windowHalfX;
      mouseY = e.clientY - windowHalfY;

      isMouseMoving = true;
      lastMouseMoveTime = Date.now();
      driftSpeed = 0.3; // slow when interacting
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

    const positionsAttr = geometry.getAttribute('position');
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const t = clock.getElapsedTime();

      // Drift speed logic
      if (Date.now() - lastMouseMoveTime > 2000) {
        driftSpeed = 0.8; // back to normal if idle
        isMouseMoving = false;
      }

      // Move particles forward
      for (let i = 0; i < positionsAttr.count; i++) {
        let z = positionsAttr.getZ(i);
        z += driftSpeed;
        if (z > 1000) z = -1000;
        positionsAttr.setZ(i, z);
      }
      positionsAttr.needsUpdate = true;

      // Rotate starfield
      stars.rotation.y += 0.0001;
      stars.rotation.x += 0.00005;

      // Camera subtle float
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

  return <div ref={containerRef} className="w-full h-full" />;
}
