'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Eyes() {
  const eyeRefs = useRef([]);
  const containerRef = useRef(null);
  const [blinked, setBlinked] = useState(false);

  // Cursor tracking & blinking logic stays in useEffect
  useEffect(() => {
    const handleMouseMove = (e) => {
      eyeRefs.current.forEach((eye) => {
        const pupil = eye.querySelector('.pupil');
        const rect = eye.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const angle = Math.atan2(deltaY, deltaX);
        const radius = 6;

        const moveX = Math.cos(angle) * radius;
        const moveY = Math.sin(angle) * radius;

        pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    const blink = () => {
      setBlinked(true);
      setTimeout(() => setBlinked(false), 200);
      setTimeout(blink, Math.random() * 5000 + 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const blinkTimeout = setTimeout(blink, 2000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(blinkTimeout);
    };
  }, []);

  // 👇 GSAP scroll reveal animation via useGSAP
  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from(containerRef.current, {
      y: 150,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: containerRef });

  return (
    <div className="flex items-center justify-center min-h-fit overflow-hidden font-satoshi">
      <div
        ref={containerRef}
        className="w-[110px] h-[100px] rounded-[22px] shadow-md bg-gradient-to-b from-[#e8e4d0] to-[#e8e3ce] flex items-center justify-center pb-4 relative"
      >
        <div className="flex gap-[3px]">
          {[0, 1].map((_, i) => (
            <div
              key={i}
              ref={(el) => (eyeRefs.current[i] = el)}
              className="relative w-[36px] h-[36px] rounded-full flex items-center justify-center shadow-md overflow-hidden bg-[radial-gradient(circle_at_center,_#ffffff,_#f5f5f5)]"
            >
              <div className="pupil w-[12px] h-[12px] rounded-full bg-[radial-gradient(circle,_#000_60%,_#222)] absolute transition-transform duration-75 ease-out" />
              <div
                className={`absolute top-0 left-0 w-full h-full rounded-full bg-[#f0f0f0] transition-transform duration-200 ease-in-out ${
                  blinked ? 'translate-y-0' : '-translate-y-full'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
