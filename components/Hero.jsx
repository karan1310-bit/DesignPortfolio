'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { BsArrowDown } from 'react-icons/bs';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Preloader from './Preloader';

gsap.registerPlugin(ScrollTrigger);

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const Hero = () => {
  const lineRefs = useRef([]);
  const arrowRefs = useRef([]);
  const imageRef = useRef(null);
  const developerRef = useRef(null);
  const containerRef = useRef(null);

  const [ isLoading, setIsLoading ] = useState(true);

  useGSAP(() => {
    // Headings and paragraph text animation
    gsap.from(lineRefs.current, {
      y: 150,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out',
      stagger: 0.1,
    });

    gsap.from(arrowRefs.current, {
      y: 150,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out',
      stagger: 0.1,
    });

    gsap.from(imageRef.current, {
      y: 150,
      opacity: 0,
      duration: 1.5,
      delay: 0.5,
      ease: 'power3.out',
    });

    // Background parallax effect
    const innerImage = document.querySelector('.parallax-hero');
    if (innerImage) {
      gsap.fromTo(
        innerImage,
        { backgroundPosition: '50% 0%' },
        {
          backgroundPosition: '50% 100%',
          ease: 'none',
          scrollTrigger: {
            trigger: innerImage,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    // Text scrambling effect
    const el = developerRef.current;
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

          if (iteration >= originalText.length) {
            clearInterval(interval);
          }
          iteration += 0.5;
        }, 30);
      };

      runScramble();
      const repeat = setInterval(runScramble, 5000);
      return () => clearInterval(repeat);
    }
  }, { scope: containerRef });

  const headingLines = ['CREATIVE', 'DEVELOPER'];
  const paragraphLines = [
    'I collaborate with agencies to engineer modern,',
    'expressive web interfaces. currently available',
    'for freelance work.',
  ];

  return (
    <>
    {isLoading && (
      <Preloader />
    )}

    <section
      ref={containerRef}
      className="pt-24 md:pt-28 px-4 sm:px-6 md:px-10 lg:px-12 font-satoshi"
    >
      {/* Heading */}
      <div className="text-[15vw] sm:text-[10vw] md:text-[8vw] lg:text-[9.5vw] xl:text-[9.5vw] font-bold leading-[0.9]">
        <div className="overflow-hidden">
          <h1 ref={(el) => (lineRefs.current[0] = el)} className="block">
            CREATIVE
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1
            ref={(el) => {
              lineRefs.current[1] = el;
              developerRef.current = el;
            }}
            data-value="DEVELOPER"
            className="block"
          >
            DEVELOPER
          </h1>
        </div>
      </div>

      <div className="mt-6 md:mt-10 flex flex-col md:flex-row items-start gap-8 md:gap-16 lg:gap-24">
        {/* Image Section */}
        <div className="w-[80vw] md:w-1/2">
          <div className="aspect-[1/1] md:aspect-[3/1.2] overflow-hidden">
            <div className="w-full h-full overflow-hidden group">
              <div
                className="w-full h-full parallax-hero bg-cover bg-top bg-no-repeat"
                style={{ backgroundImage: "url('/images/img3.png')" }}
                ref={imageRef}
              ></div>
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="w-[85vw] sm:w-1/2 flex flex-col md:gap-2 leading-tight">
          {paragraphLines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <p
                ref={(el) =>
                  (lineRefs.current[headingLines.length + i] = el)
                }
                className="text-lg md:text-base lg:text-2xl font-semibold leading-tight lg:leading-none uppercase"
              >
                {line}
              </p>
            </div>
          ))}
          <BsArrowDown
            className="hidden md:block text-2xl sm:text-2xl self-start"
            ref={(el) => (arrowRefs.current[1] = el)}
          />
        </div>
      </div>
    </section></>
  );
};

export default Hero;
