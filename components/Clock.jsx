'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Clock() {
  const [time, setTime] = useState(null);
  const clockRef = useRef(null);

  // ⏱ Time updates
  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ✨ GSAP animation on mount
  useGSAP(() => {
    if (clockRef.current) {
      gsap.from(clockRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
      });
    }
  }, { scope: clockRef });

  const formatTime = (date) =>
    date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

  if (!time) return null;

  return (
    <p
      ref={clockRef}
      className="text-base md:text-lg font-satoshi font-medium tracking-wider md:text-right"
    >
      {formatTime(time)}
    </p>
  );
}
