'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function RecentProject() {
  const lineRefs = useRef([]);
  const containerRef = useRef(null);
  const imageRefs = useRef([]);

  useGSAP(() => {
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

    // Animate image sections
    imageRefs.current.forEach((ref) => {
      if (!ref) return;

      // Entry animation
      gsap.from(ref, {
        y: 150,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Parallax background
      const imageInner = ref.querySelector('.parallax-bg');
      if (imageInner) {
        gsap.fromTo(
          imageInner,
          { backgroundPosition: '50% 0%' },
          {
            backgroundPosition: '50% 100%',
            ease: 'none',
            scrollTrigger: {
              trigger: ref,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="font-satoshi min-h-screen w-full px-4 sm:px-6 md:px-10 lg:px-12 py-12 sm:py-20"
    >
      <div className="overflow-hidden">
        <p ref={(el) => (lineRefs.current[0] = el)} className="text-base sm:text-xl font-semibold">
          03/
        </p>
      </div>

      <div className="flex max-w-9xl md:max-w-5xl justify-between text-base leading-tight mt-6 md:mt-8 sm:text-xl lg:text-2xl uppercase font-semibold">
        <div className="overflow-hidden">
          <span ref={(el) => (lineRefs.current[1] = el)}>Recent Freelance Projects</span>
        </div>
        <div className="overflow-hidden">
          <span ref={(el) => (lineRefs.current[2] = el)}>Creative Development</span>
        </div>
      </div>

      {/* Project 1 */}
      <div className="grid grid-cols-1 items-start w-[80vw] sm:w-full gap-8 mt-8 md:mt-12">
        <div className="space-y-0 md:space-y-1">
          {['SLEEK', 'FRAME'].map((text, idx) => (
            <div className="overflow-hidden" key={text}>
              <Link href="https://sleekframestudio.com/" target="_blank" className="cursor-pointer">
                <h1
                  ref={(el) => (lineRefs.current[3 + idx] = el)}
                  className="text-[clamp(2.5rem,8vw,6rem)] leading-none font-bold tracking-tight"
                >
                  <span className="group relative inline-block pt-2">
                    <span className="relative z-10 inline-block after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-black after:scale-x-100 after:origin-left after:transition-transform after:duration-500 group-hover:after:scale-x-75">
                      {text}
                    </span>
                  </span>
                </h1>
              </Link>
            </div>
          ))}
          <div className="overflow-hidden">
            <p
              ref={(el) => (lineRefs.current[5] = el)}
              className="text-base md:text-lg max-w-sm font-medium pt-2 md:pt-4 uppercase"
            >
              A Design Agency
            </p>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            ref={(el) => (imageRefs.current[0] = el)}
            className="group relative w-full md:w-[50vw] md:h-[30vh] aspect-[1/1] md:aspect-[21/9] overflow-hidden"
          >
            <div
              className="parallax-bg w-full h-full bg-cover bg-no-repeat bg-center"
              style={{ backgroundImage: "url('/images/4.png')" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Project 2 */}
      <div className="grid grid-cols-1 items-start w-[80vw] sm:w-full gap-8 mt-8 md:mt-16">
        <div className="space-y-0 md:space-y-1">
          {['DISCO', 'DEN'].map((text, idx) => (
            <div className="overflow-hidden" key={text}>
              <h1
                ref={(el) => (lineRefs.current[6 + idx] = el)}
                className="text-[clamp(2.5rem,8vw,6rem)] leading-none font-bold tracking-tight"
              >
                <span className="group relative inline-block pt-2">
                  <span className="relative z-10 inline-block after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-black after:scale-x-100 after:origin-left after:transition-transform after:duration-500 group-hover:after:scale-x-75">
                    {text}
                  </span>
                </span>
              </h1>
            </div>
          ))}
          <div className="overflow-hidden">
            <p
              ref={(el) => (lineRefs.current[8] = el)}
              className="text-base md:text-lg max-w-sm font-medium pt-2 md:pt-4 uppercase"
            >
              An Inflatable Nightclub
            </p>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            ref={(el) => (imageRefs.current[1] = el)}
            className="group relative w-full md:w-[50vw] md:h-[30vh] aspect-[1/1] sm:aspect-[21/9] overflow-hidden"
          >
            <div
              className="parallax-bg w-full h-full bg-cover bg-no-repeat bg-center"
              style={{ backgroundImage: "url('/images/5.png')" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
