import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const HomeAbout = () => {
    const lineRefs = useRef([]);
    const containerRef = useRef(null);
  
    const h1Lines = [
      "PASSIONATE ABOUT WEB TECHNOLOGIES. I LOVE",
      "CRAFTING VISUAL INTERFACES THAT FLOW. I MERGE",
      "CREATIVE VISION WITH PURPOSEFUL DESIGN TO",
      "DELIVER FLUID, UNFORGETTABLE EXPERIENCES."
    ];
  
    const pLines = [
      "WHEN I'M NOT BUILDING WEB STUFF,",
      "I'M PROBABLY LIFTING HEAVY, CHEERING",
      "FOR RCB, OR WRECKING CHAOS IN GTA."
    ];
  
    const aboutIntro = "A blend of UI and product engineering.";
  
    const aboutParagraphs = [
      "With a design background, I build clean, responsive sites with design-focused teams. As a freelance frontend dev, I’ve worked on a range of projects for various clients.",
      "With a knack for UI and product thinking, I turn tricky ideas into clean, usable web experiences — and actually make them look good too."
    ];
  
    useEffect(() => {
      if (!containerRef.current) return;
  
      gsap.from(lineRefs.current, {
        y: 100,
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
    }, []);
  
    return (
      <main className="min-h-fit font-satoshi text-black px-4 sm:px-6 md:px-10 lg:px-12 py-12 sm:py-20">
        <section ref={containerRef} className="space-y-6 sm:space-y-8">
          <div className="text-base sm:text-xl font-semibold">01/</div>

          <div className="space-y-0">
            {h1Lines.map((line, index) => (
              <div key={index} className="overflow-hidden">
                <h1
                  ref={(el) => (lineRefs.current[index] = el)}
                  className="w-[85vw] sm:w-full text-lg sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight md:leading-none"
                >
                  {line}
                </h1>
              </div>
            ))}
          </div>

          <div className="space-y-0">
            {pLines.map((line, index) => (
              <div key={index} className="overflow-hidden">
                <p
                  ref={(el) => (lineRefs.current[index + h1Lines.length] = el)}
                  className="text-base sm:text-lg md:text-xl leading-snug"
                >
                  {line}
                </p>
              </div>
            ))}
          </div>

          <section className="grid grid-cols-1 md:grid-cols-4 gap-1 md:gap-10 pt-2 sm:pt-12">
            <div className="overflow-hidden">
              <div
                className="text-base sm:text-3xl uppercase leading-tight lg:leading-none font-semibold mb-4 md:mb-0"
                ref={(el) =>
                  (lineRefs.current[h1Lines.length + pLines.length] = el)
                }
              >
                {aboutIntro}
              </div>
            </div>

            <div className="md:col-span-2 space-y-3 md:space-y-3">
              {aboutParagraphs.map((para, index) => (
                <div key={index} className="overflow-hidden">
                  <p
                    className="w-[80vw] sm:w-full text-sm sm:text-base md:text-xl leading-snug"
                    ref={(el) =>
                      (lineRefs.current[
                        index + h1Lines.length + pLines.length + 1
                      ] = el)
                    }
                  >
                    {para}
                  </p>
                </div>
              ))}

              <div className="overflow-hidden">
                <a
                  href="#services"
                  ref={(el) =>
                    (lineRefs.current[
                      h1Lines.length +
                        pLines.length +
                        1 +
                        aboutParagraphs.length
                    ] = el)
                  }
                  className="inline-block relative text-black pb-1 font-normal lg:font-semibold uppercase text-sm sm:text-xl group"
                  >
                    More about me and services
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </div>
            </div>
          </section>
        </section>
      </main>
    );
}

export default HomeAbout