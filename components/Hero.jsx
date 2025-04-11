import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BsArrowDown } from "react-icons/bs";

const Hero = () => {
  const lineRefs = useRef([]);
  const arrowRefs = useRef([]);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.from(lineRefs.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.1,
      delay: 6,
    });

    gsap.from(arrowRefs.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 6,
      stagger: 0.2,
    });

    gsap.from(imageRef.current, {
      y: 100, // 👈 comes from below
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      delay: 6.2,
    });
  }, []);

  const headingLines = ["CREATIVE", "DEVELOPER"];
  const paragraphLines = [
    "I collaborate with agencies to engineer modern,",
    "expressive web interfaces. currently available",
    "for freelance work.",
  ];
  const mobileName = "Karan";

  return (
    <section className="pt-20 md:pt-28 px-4 sm:px-6 md:px-10 lg:px-12 font-satoshi">
      {/* Heading */}
      <div className="text-[15vw] sm:text-[10vw] md:text-[8vw] lg:text-[9.5vw] xl:text-[9.5vw] font-bold leading-[0.9]">
        {headingLines.map((line, index) => (
          <div key={index} className="overflow-hidden">
            <h1 ref={(el) => (lineRefs.current[index] = el)} className="block">
              {line}
            </h1>
          </div>
        ))}
      </div>

      <div className="mt-6 md:mt-10 flex flex-col md:flex-row items-start gap-8 md:gap-16 lg:gap-24">
        {/* Image Section */}
        <div className="w-3/4 md:w-1/2">
          {/* Aspect ratio container */}
          <div className="aspect-[1/1] md:aspect-[3/1.2] overflow-hidden">
            {/* Animation wrapper with overflow hidden */}
            <div className="w-full h-full overflow-hidden group">
              <div ref={imageRef} className="w-full h-full">
                <Image
                  src="/images/img1.png"
                  alt="Portrait of Richard"
                  width={1600}
                  height={600}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Name + Arrow */}
        <div className="flex items-start md:hidden gap-2">
          <div className="overflow-hidden">
            <h1
              className="text-[13vw] uppercase font-semibold leading-[0.9]"
              ref={(el) =>
                (lineRefs.current[headingLines.length + paragraphLines.length] =
                  el)
              }
            >
              {mobileName}
            </h1>
          </div>
          <BsArrowDown
            className="text-4xl font-light self-start"
            ref={(el) => (arrowRefs.current[0] = el)}
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col md:gap-2 leading-tight">
          {paragraphLines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <p
                ref={(el) => (lineRefs.current[headingLines.length + i] = el)}
                className="text-xl md:text-base lg:text-xl font-semibold leading-none lg:leading-none uppercase"
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
    </section>
  );
};

export default Hero;
