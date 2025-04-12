'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Clock() {
  const [time, setTime] = useState(null); // No time on initial render
  const clockRef = useRef(null);

  useEffect(() => {
    // Set initial time only on client
    setTime(new Date());

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (clockRef.current) {
      gsap.from(clockRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
      });
    }
  }, []);

  const formatTime = (date) =>
    date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

  if (!time) return null; // 👈 Don’t render during SSR

  return (
    <p
      ref={clockRef}
      className="text-base md:text-lg font-satoshi font-medium tracking-wider md:text-right"
    >
      {formatTime(time)}
    </p>
  );
}
