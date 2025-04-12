'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function RecentProject() {
  const lineRefs = useRef([]);
  const containerRef = useRef(null);
  const imageRef1 = useRef(null);
  const imageRef2 = useRef(null);

  useEffect(() => {
    // Animate text lines
    gsap.from(lineRefs.current, {
      y: 150,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Animate images on scroll (no parallax)
    [imageRef1, imageRef2].forEach((ref) => {
      if (!ref.current) return;
      gsap.from(ref.current, {
        y: 150,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="font-satoshi min-h-screen w-full px-4 sm:px-6 md:px-10 lg:px-12 py-12 sm:py-20"
    >
      <div className="text-base sm:text-xl font-semibold">03/</div>

      <div className="flex max-w-9xl md:max-w-5xl justify-between text-base leading-tight mt-6 md:mt-8 sm:text-xl lg:text-2xl uppercase font-semibold">
        <span ref={(el) => (lineRefs.current[0] = el)}>Recent Freelance Projects</span>
        <span ref={(el) => (lineRefs.current[1] = el)}>Creative Development</span>
      </div>

      {/* Project 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center w-[80vw] sm:w-full gap-8 md:gap-0 mt-8 md:mt-16">
        <div className="space-y-0 md:space-y-1">
          {['SLEEK', 'FRAME'].map((text, idx) => (
            <div className="overflow-hidden" key={text}>
              <h1
                ref={(el) => (lineRefs.current[2 + idx] = el)}
                className="text-[clamp(2.5rem,8vw,6rem)] leading-none font-bold tracking-tight"
              >
                <span className="group relative inline-block pt-2">
                  <span className="relative z-10 inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:h-[3px] after:w-full after:bg-black after:scale-x-100 after:origin-left after:transition-transform after:duration-500 group-hover:after:scale-x-75">
                    {text}
                  </span>
                </span>
              </h1>
            </div>
          ))}
          <p
            ref={(el) => (lineRefs.current[4] = el)}
            className="text-base md:text-lg max-w-sm font-medium pt-2 md:pt-4 uppercase"
          >
            A Design Agency
          </p>
        </div>

        {/* Image w/ scroll + hover animation */}
        <div
          ref={imageRef1}
          className="group relative w-full aspect-[1/1] md:aspect-[21/9] overflow-hidden"
        >
          <Image
            src="/images/2.png"
            alt="Sleek Frame Image"
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="w-full h-full object-cover object-bottom transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1"
          />
        </div>
      </div>

      {/* Project 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center w-[80vw] sm:w-full gap-8 md:gap-0 mt-8 md:mt-16">
        <div className="space-y-0 md:space-y-1">
          {['DISCO', 'DEN'].map((text, idx) => (
            <div className="overflow-hidden" key={text}>
              <h1
                ref={(el) => (lineRefs.current[5 + idx] = el)}
                className="text-[clamp(2.5rem,8vw,6rem)] leading-none font-bold tracking-tight"
              >
                <span className="group relative inline-block pt-2">
                  <span className="relative z-10 inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] md:after:h-[3px] after:w-full after:bg-black after:scale-x-100 after:origin-left after:transition-transform after:duration-500 group-hover:after:scale-x-75">
                    {text}
                  </span>
                </span>
              </h1>
            </div>
          ))}
          <p
            ref={(el) => (lineRefs.current[7] = el)}
            className="text-base md:text-lg max-w-sm font-medium pt-2 md:pt-4 uppercase"
          >
            An Inflatable Nightclub
          </p>
        </div>

        {/* Image w/ scroll + hover animation */}
        <div
          ref={imageRef2}
          className="group relative w-full aspect-[1/1] sm:aspect-[21/9] overflow-hidden"
        >
          <Image
            src="/images/1.jpg"
            alt="Disco Den Image"
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1"
          />
        </div>
      </div>
    </section>
  );
}
