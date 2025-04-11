import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomeHobbie() {
  const lineRefs = useRef([]);
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  // Paragraph lines
  const paragraphLines = [
    'My hobbies take up a good portion of my leisure time.',
    "Escaping reality, one anime or movie at a time..",
    'Usually somewhere between reality and a playlist, just vibing.',
    'Wanderlust isn’t just a word, it’s my default setting.',
  ];

  useEffect(() => {
    // Run animation after all DOM nodes are in place
    setTimeout(() => {
      gsap.from(lineRefs.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(imageRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        delay: 0.3,
      });
    }, 0);
  }, []);

  return (
    <main className="font-satoshi min-h-fit text-black px-4 sm:px-6 md:px-10 lg:px-12 py-0 sm:py-2">
      {/* Hero Section */}
      <section ref={containerRef} className="space-y-6 sm:space-y-10 max-w-7xl">
        <div className="text-base sm:text-xl font-semibold">02/</div>

        <div className="text-left">
          {["MOVIES", "TRAVEL"].map((title, index) => (
            <div className="overflow-hidden" key={title}>
              <h1
                ref={(el) => (lineRefs.current[index] = el)}
                className="text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.9]"
              >
                {title}
              </h1>
            </div>
          ))}

          {/* Image + Paragraph */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start my-4 md:my-6">
            {/* Left: Image */}
            <div className="w-3/4 sm:w-4/5 md:w-full lg:w-full">
              <div className="aspect-[1/1] md:aspect-[3/1.2] overflow-hidden">
                <div
                  ref={imageRef}
                  className="relative w-full h-full overflow-hidden group"
                >
                  <Image
                    src="/images/img2.png"
                    alt="VR Gaming"
                    width={1600}
                    height={600}
                    priority
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1"
                  />
                </div>
              </div>
            </div>

            {/* Right: Paragraph */}
            <div className="overflow-hidden flex text-left items-start max-w-xs md:max-w-2xl lg:max-w-3xl">
              <p className="text-base sm:text-lg md:text-base lg:text-xl uppercase leading-tight">
                {paragraphLines.map((line, i) => (
                  <span
                    key={i}
                    ref={(el) => (lineRefs.current[i + 2] = el)} // offset for the 2 headings
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
              ref={(el) => (lineRefs.current[paragraphLines.length + 2] = el)}
              className="text-[clamp(2.5rem,8vw,6rem)] font-bold leading-none"
            >
              MUSIC
            </h1>
          </div>
        </div>
      </section>
    </main>
  );
}
