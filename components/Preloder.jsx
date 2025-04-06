import { useEffect } from "react";
import gsap from "gsap";
import SplitType from "split-type";

const Preloader = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadingText = new SplitType(".loading-text.initial", { types: "chars" });
    const completeText = new SplitType(".loading-text.complete", { types: "chars" });
    const titleText = new SplitType(".hero h1", { types: "chars" });
    const paragraphText = new SplitType(".hero p", { types: "chars" });

    gsap.set(".loading-text.complete", { y: "100%" });
    gsap.set(loadingText.chars, { opacity: 0, y: 100 });
    gsap.set(completeText.chars, { opacity: 0, y: 100 });

    gsap.to(loadingText.chars, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.out",
    });

    const tl = gsap.timeline();

    tl.to(".progress-bar", {
      width: "100%",
      duration: 5,
      ease: "power1.inOut",
      onUpdate: function () {
        const progress = Math.round(this.progress() * 100);
        document.querySelector(".percentage").textContent = progress;
      },
    })
      .to(".loading-text.initial", {
        y: "-100%",
        duration: 0.5,
        ease: "power2.inOut",
      })
      .to(
        ".loading-text.complete",
        {
          y: "0%",
          duration: 0.5,
          ease: "power2.inOut",
        },
        "<"
      )
      .to(
        completeText.chars,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.03,
          ease: "power2.out",
        },
        "<0.2"
      )
      .to(".preloader", {
        y: "-100vh",
        duration: 1,
        ease: "power2.inOut",
        delay: 0.8,
      })
      .set(
        ".hero",
        {
          visibility: "visible",
        },
        "-=1"
      )
      .to(
        [titleText.chars, paragraphText.chars],
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.02,
          ease: "power4.out",
        },
        "-=0.5"
      )
      .set(".preloader", {
        display: "none",
      });
  }, []);

  return (
      <div className="preloader fixed inset-0 font-satoshi z-50 flex flex-col items-center justify-center bg-[#e5e3e0]">
        <div className="progress-container w-[300px] h-[2px] bg-white/10 mb-2 relative z-10">
          <div className="progress-bar absolute top-0 left-0 h-full w-0 bg-black" />
        </div>
        <div className="text-container relative h-16 w-[200px] overflow-hidden my-2">
          <div className="loading-text initial font-satoshi absolute w-full text-center uppercase leading-none tracking-tight text-xl">Opening an S-rank Gate</div>
          <div className="loading-text complete font-satoshi absolute w-full text-center uppercase tracking-tight text-xl">Quest complete</div>
        </div>
        <div className="percentage fixed bottom-8 right-8 text-[25rem] font-satoshi font-bold opacity-10 leading-[0.8]">0</div>
        </div>
  );
};

export default Preloader;
