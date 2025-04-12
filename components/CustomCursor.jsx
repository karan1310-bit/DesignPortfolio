import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState({ x: 1, y: 1 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      
      setPosition({ x: clientX, y: clientY });
      
      setScale((prev) => {
        const xscale = gsap.utils.clamp(0.8, 1.2, clientX - prev.x);
        const yscale = gsap.utils.clamp(0.8, 1.2, clientY - prev.y);
        return { x: xscale, y: yscale };
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    gsap.to("#minicircle", {
      x: position.x,
      y: position.y,
      scaleX: scale.x,
      scaleY: scale.y,
      duration: 0.1,
      ease: "power2.out",
    });
  }, [position, scale]);

  return (
    <div
      id="minicircle"
      style={{
        width: "8px",
        height: "8px",
        backgroundColor: "black",
        borderRadius: "0%",
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
      }}
    ></div>
  );
};

export default Cursor;