'use client';

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Eyes from "./Eye";
import Clock from "./Clock";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const containerRef = useRef(null);
  const lineRefs = useRef([]);
  lineRefs.current = [];

  const addToRefs = (el) => {
    if (el && !lineRefs.current.includes(el)) {
      lineRefs.current.push(el);
    }
  };

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from(lineRefs.current, {
      y: 150,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="bg-[#e5e3e0] text-black font-satoshi px-4 sm:px-8 pb-8 lg:px-12"
    >
      <div className="overflow-hidden">
        <p ref={addToRefs} className="text-base sm:text-xl font-semibold">04/</p>
      </div>

      <div className="flex mb-8 md:mb-20 mt-6 md:mt-8 justify-between items-center">
        <div className="overflow-hidden">
          <p ref={addToRefs} className="text-lg md:text-2xl font-semibold leading-tight">
            WANT TO WORK TOGETHER?
          </p>
        </div>
        <div className="hidden sm:block overflow-hidden">
          <p ref={addToRefs} className="text-xl md:text-2xl font-semibold leading-tight">
            SEND ME A MESSAGE
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:hidden justify-end items-start gap-8">
        <div className="w-[60vw] text-left">
          <a href="mailto:kfreelance131@gmail.com" className="inline-block">
            <div className="flex flex-col space-y-1">
              {["KWORK", "131", "@GMAIL", ".COM"].map((word, i) => (
                <span
                  key={i}
                  ref={addToRefs}
                  className="text-6xl font-bold relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-[5px] after:w-full after:bg-black"
                >
                  {word}
                </span>
              ))}
            </div>
          </a>
        </div>
        <Eyes />
      </div>

      <div className="hidden sm:flex justify-between items-center pr-12">
        <div className="group w-fit">
          <h1 className="text-[10vw] sm:text-5xl md:text-7xl lg:text-9xl font-bold leading-none space-y-4">
            <div className="overflow-hidden">
              <a
                href="mailto:kfreelance131@gmail.com"
                className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[5px] after:w-full after:bg-black after:scale-x-0 after:origin-left after:transition-transform after:duration-500 group-hover:after:scale-x-100"
              >
                <span ref={addToRefs} className="inline-block">KFREELANCE</span>
              </a>
            </div>
            <div className="overflow-hidden">
              <a
                href="mailto:kfreelance131@gmail.com"
                className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[5px] after:w-full after:bg-black after:scale-x-0 after:origin-left after:transition-transform after:duration-500 group-hover:after:scale-x-100"
              >
                <span ref={addToRefs} className="inline-block">@GMAIL.COM</span>
              </a>
            </div>
          </h1>
        </div>
        <Eyes />
      </div>

      <footer className="grid grid-cols-1 sm:grid-cols-3 text-base md:text-lg uppercase font-medium mt-12 md:mt-20 gap-4 md:gap-8">
        <div className="space-y-0 md:text-left">
          <div className="overflow-hidden">
            <p ref={addToRefs}>Karan Singh Bhati</p>
          </div>
          <div className="overflow-hidden">
            <p ref={addToRefs}>Creative developer</p>
          </div>
        </div>
        <div className="space-y-0 md:text-center">
          <div className="overflow-hidden">
            <p ref={addToRefs}>
              <a
                href="https://x.com/bhati_131?t=vnNfkKdx59cJmwNvNuOHrQ&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-black after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                Twitter
              </a>
              ,
              <a
                href="https://www.instagram.com/bhati_.01?igsh=Z3VyZjlpYjh5Znc2"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-black after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 mx-1"
              >
                Instagram
              </a>
              ,
              <a
                href="https://github.com/karan1310-bit"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-black after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                Github
              </a>
            </p>
          </div>
        </div>
        <div className="space-y-0 md:text-right">
          <div className="overflow-hidden">
            <p ref={addToRefs}>Development Me</p>
          </div>
          <div className="overflow-hidden">
            <Clock />
          </div>
        </div>
      </footer>
    </section>
  );
}
