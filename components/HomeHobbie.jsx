'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function HomeHobbie() {
  const lineRefs = useRef([]);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const filmmakingRef = useRef(null);

  const paragraphLines = [
    'My hobbies take up a good portion of my leisure time.',
    "whether it's anime marathons or movie binges, I’m in.",
    'Somewhere between playlists and packing lists, you’ll',
    'find me filming travel chaos and calling it "cinematic.',
  ];

  useGSAP(() => {
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

    gsap.from(imageRef.current, {
      y: 150,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      delay: 0.3,
    });

    const parallaxInner = imageRef.current?.querySelector('.parallax-hobbie');
    if (parallaxInner) {
      gsap.fromTo(
        parallaxInner,
        { backgroundPosition: '50% 0%' },
        {
          backgroundPosition: '50% 100%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    // Scrambling effect
    const el = filmmakingRef.current;
    if (el) {
      let interval;
      const runScramble = () => {
        let iteration = 0;
        const originalText = el.dataset.value;

        clearInterval(interval);
        interval = setInterval(() => {
          el.innerText = originalText
            .split('')
            .map((letter, index) => {
              if (index < iteration) return originalText[index];
              return letters[Math.floor(Math.random() * 26)];
            })
            .join('');

          if (iteration >= originalText.length) clearInterval(interval);
          iteration += 0.5;
        }, 30);
      };

      runScramble();
      const repeat = setInterval(runScramble, 5000);
      return () => clearInterval(repeat);
    }
  }, { scope: containerRef });

  return (
    <main className="font-satoshi min-h-fit text-black px-4 sm:px-6 md:px-10 lg:px-12 py-0 sm:py-2">
      <section ref={containerRef} className="space-y-4 sm:space-y-10 max-w-7xl">
        <div className="text-base sm:text-xl font-semibold">02/</div>

        <div className="text-left">
          {['MOVIES', 'TRAVEL'].map((title, index) => (
            <div className="overflow-hidden" key={title}>
              <h1
                ref={(el) => (lineRefs.current[index] = el)}
                className="text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.9]"
              >
                {title}
              </h1>
            </div>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start my-4 md:my-6">
            <div className="w-[80vw] sm:w-4/5 md:w-full lg:w-full">
              <div className="aspect-[1/1] md:aspect-[3/1.2] overflow-hidden">
                <div
                  ref={imageRef}
                  className="relative w-full h-full overflow-hidden group"
                >
                  <div
                    className="parallax-hobbie w-full h-full bg-cover bg-top bg-no-repeat"
                    style={{ backgroundImage: "url('/images/img4.png')" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden flex text-left items-start w-[80vw] sm:max-w-2xl lg:max-w-3xl">
              <p className="text-base sm:text-lg md:text-base lg:text-xl uppercase leading-tight">
                {paragraphLines.map((line, i) => (
                  <span
                    key={i}
                    ref={(el) => (lineRefs.current[i + 2] = el)}
                    className="block overflow-hidden"
                  >
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className="overflow-hidden hidden md:block">
            <h1
              ref={(el) => {
                lineRefs.current[paragraphLines.length + 2] = el;
                filmmakingRef.current = el;
              }}
              data-value="FILMMAKING"
              className="text-[clamp(2.5rem,8vw,6rem)] font-bold leading-snug"
            >
              FILMMAKING
            </h1>
          </div>
        </div>
      </section>
    </main>
  );
}
