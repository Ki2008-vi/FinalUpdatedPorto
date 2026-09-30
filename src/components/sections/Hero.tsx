import React, { useEffect, useRef, useState } from "react";
import { SplitText } from "../ui/SplitText";
import { ImageFlip } from "../ui/ImageFlip";
import { gsap } from "../../lib/gsap";

const FLAIR_IMAGES = [
  "https://assets.codepen.io/16327/Revised+Flair.png",
  "https://assets.codepen.io/16327/Revised+Flair-1.png",
  "https://assets.codepen.io/16327/Revised+Flair-2.png",
  "https://assets.codepen.io/16327/Revised+Flair-3.png",
  "https://assets.codepen.io/16327/Revised+Flair-4.png",
  "https://assets.codepen.io/16327/Revised+Flair-5.png",
  "https://assets.codepen.io/16327/Revised+Flair-6.png",
  "https://assets.codepen.io/16327/Revised+Flair-7.png",
  "https://assets.codepen.io/16327/Revised+Flair-8.png",
  "https://assets.codepen.io/16327/Revised+Flair.png",
  "https://assets.codepen.io/16327/Revised+Flair-1.png",
  "https://assets.codepen.io/16327/Revised+Flair-2.png",
  "https://assets.codepen.io/16327/Revised+Flair-3.png",
  "https://assets.codepen.io/16327/Revised+Flair-4.png",
  "https://assets.codepen.io/16327/Revised+Flair-5.png",
  "https://assets.codepen.io/16327/Revised+Flair-6.png",
  "https://assets.codepen.io/16327/Revised+Flair-7.png",
  "https://assets.codepen.io/16327/Revised+Flair-8.png",
];

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const [triggerAnim, setTriggerAnim] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTriggerAnim(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Interactive Cursor Trail Effect
  useEffect(() => {
    const flair = gsap.utils.toArray<HTMLImageElement>(".flair", sectionRef.current);
    if (!flair.length) return;

    let index = 0;
    const wrapper = gsap.utils.wrap(0, flair.length);
    const gap = 100;

    let mousePos = { x: 0, y: 0 };
    let lastMousePos = { x: 0, y: 0 };
    let cachedMousePos = { x: 0, y: 0 };
    let hasMoved = false;

    function playAnimation(shape: Element) {
      const tl = gsap.timeline({ defaults: { duration: 1 } });
      tl.from(shape, {
        opacity: 0,
        scale: 0,
        ease: "elastic.out(1,0.3)",
      })
      .to(
        shape,
        {
          rotation: "random([-360, 360])",
        },
        "<"
      )
      .to(
        shape,
        {
          y: "120vh",
          ease: "back.in(.4)",
          duration: 1,
        },
        0
      );
    }

    function animateImage() {
      const wrappedIndex = wrapper(index);
      const img = flair[wrappedIndex];
      if (!img) return;

      gsap.killTweensOf(img);

      gsap.set(img, {
        clearProps: "all",
      });

      gsap.set(img, {
        opacity: 1,
        left: mousePos.x,
        top: mousePos.y,
        xPercent: -50,
        yPercent: -50,
      });

      playAnimation(img);

      index++;
    }

    function imageTrail() {
      const travelDistance = Math.hypot(
        lastMousePos.x - mousePos.x,
        lastMousePos.y - mousePos.y
      );

      cachedMousePos.x = gsap.utils.interpolate(
        cachedMousePos.x || mousePos.x,
        mousePos.x,
        0.1
      );
      cachedMousePos.y = gsap.utils.interpolate(
        cachedMousePos.y || mousePos.y,
        mousePos.y,
        0.1
      );

      if (travelDistance > gap) {
        animateImage();
        lastMousePos = { ...mousePos };
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      const inHero =
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inHero) {
        hasMoved = false;
        return;
      }

      mousePos = {
        x: e.clientX,
        y: e.clientY,
      };

      if (!hasMoved) {
        lastMousePos = { ...mousePos };
        cachedMousePos = { ...mousePos };
        hasMoved = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    gsap.ticker.add(imageTrail);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(imageTrail);
      flair.forEach((img) => gsap.killTweensOf(img));
    };
  }, []);

  useEffect(() => {
    if (!triggerAnim) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Portrait Image sliding up softly from the bottom center
      tl.fromTo(
        ".hero-image-reveal",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "+=0.4"
      );

      // Bottom left copyright info fade
      tl.fromTo(
        infoRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      );

      // Bottom right badge fade
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.8"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [triggerAnim]);

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="relative h-screen w-full bg-[#f2f1ed] flex flex-col justify-between overflow-visible"
    >
      {/* Interactive Cursor Flair Trail */}
      <div className="content pointer-events-none select-none">
        {FLAIR_IMAGES.map((src, i) => (
          <img
            key={i}
            className="flair fixed opacity-0 w-[50px] pointer-events-none select-none z-40"
            src={src}
            alt=""
          />
        ))}
      </div>

      {/* Top spacer block to balance the layout */}
      <div className="pt-20 md:pt-24" />

      {/* Main Stacked Content Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center justify-center z-10 flex-grow">
        
        {/* Massive Centered Title Block */}
        <div className="w-full flex flex-col items-center select-none max-w-5xl">
          <h1 className="font-archivo font-black text-[56px] sm:text-[76px] md:text-[120px] lg:text-[110px] xl:text-[160px] leading-[0.85] tracking-[0.01em] uppercase text-black text-center flex flex-col items-center gap-2 mt-2 sm:mt-4 md:mt-6 lg:mt-8">
            <span className="block">
              <SplitText
                text="HI"
                delay={0.1}
                trigger={triggerAnim}
                stagger={0.06}
              />
            </span>
            <span className="block">
              <SplitText
                text="MATE"
                delay={0.4}
                trigger={triggerAnim}
                stagger={0.06}
              />
            </span>
          </h1>
        </div>

        {/* Mobile & Tab UI (< lg): Image centered below HI MATE */}
        <div className="hero-image-reveal opacity-0 flex justify-center items-center w-[140px] sm:w-[175px] md:w-[190px] mt-4 sm:mt-6 md:mt-8 lg:hidden z-10">
          <ImageFlip idPrefix="mobile-" />
        </div>

      </div>

      {/* Bottom Layout Row */}
      <div className="max-w-[1900px] mx-auto px-6 md:px-12 lg:px-20 xl:px-30 w-full flex flex-row justify-between items-end z-10 mb-5">
        
        {/* Left Side: Bold Big Copyright Identifier */}
        <div ref={infoRef} className="opacity-0 select-none flex-1 flex justify-start">
          <span className="font-sans text-lg sm:text-2xl md:text-5xl font-bold tracking-tight text-black whitespace-nowrap ml-0 lg:ml-45">
            ©2026
          </span>
        </div>

        {/* PC UI (lg+): Centered ImageFlip in normal flex flow, sitting on exact same height line (baseline) as bottom items */}
        <div className="hero-image-reveal opacity-0 hidden lg:flex flex-none justify-center w-[200px] ">
          <ImageFlip idPrefix="desktop-" />
        </div>

        {/* Right Side: Clean text indicator style string */}
        <div ref={badgeRef} className="opacity-0 select-none flex-1 flex justify-end">
          <span className="font-archivo text-xs sm:text-[15px] md:text-xl font-bold tracking-wider text-black/80 whitespace-nowrap ml-0">
            /FRONT-END DEVELOPER SINCE 2023
          </span>
        </div>
        
      </div>
    </section>
  );
};