'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const Cursor = () => {
  const cursorRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState({ x: 1, y: 1 });

  // Track mouse movement and update state
  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;

      setPosition({ x: clientX, y: clientY });

      setScale((prev) => {
        const xscale = gsap.utils.clamp(0.8, 1.2, (clientX - prev.x) / 100);
        const yscale = gsap.utils.clamp(0.8, 1.2, (clientY - prev.y) / 100);
        return { x: xscale, y: yscale };
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Use GSAP for cursor transform
  useGSAP(() => {
    if (!cursorRef.current) return;

    gsap.to(cursorRef.current, {
      x: position.x,
      y: position.y,
      scaleX: scale.x,
      scaleY: scale.y,
      duration: 0.1,
      ease: 'power2.out',
    });
  }, { dependencies: [position, scale] });

  return (
    <div
      ref={cursorRef}
      style={{
        width: '8px',
        height: '8px',
        backgroundColor: 'black',
        borderRadius: '0%',
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
      }}
    ></div>
  );
};

export default Cursor;
