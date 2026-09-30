import React, { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import backImgSrc from "../../assets/images/majd_back_portrait_1781865636175.jpg";
import frontImgSrc from "../../assets/images/guwe.jpg";

// Explicit local registration required for Next.js/React environments
gsap.registerPlugin(ScrollTrigger);

export const ImageFlip: React.FC<{ idPrefix?: string }> = ({ idPrefix = "" }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const backImg = backImgSrc;
  const frontImg = frontImgSrc;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    let ctx = gsap.context(() => {});

    // Poll the DOM until layout targets are painted
    const checkDOM = setInterval(() => {
      const target = document.getElementById("bio-image-target");
      const hero = document.getElementById("hero-section");
      const about = document.getElementById("about-section");

      if (target && hero && about) {
        clearInterval(checkDOM);

        ctx.add(() => {
          const getTransform = () => {
            // Temporarily strip transforms to obtain clean viewport coordinates
            const currentX = gsap.getProperty(wrapper, "x");
            const currentY = gsap.getProperty(wrapper, "y");
            const currentScaleX = gsap.getProperty(wrapper, "scaleX");
            const currentScaleY = gsap.getProperty(wrapper, "scaleY");
            
            gsap.set(wrapper, { x: 0, y: 0, scaleX: 1, scaleY: 1 });
            
            const start = wrapper.getBoundingClientRect();
            const end = target.getBoundingClientRect();
            
            // Restore origin transforms
            gsap.set(wrapper, { x: currentX, y: currentY, scaleX: currentScaleX, scaleY: currentScaleY });

            return {
              x: end.left - start.left,
              y: end.top - start.top,
              scaleX: end.width / start.width,
              scaleY: end.height / start.height,
            };
          };

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              endTrigger: about,
              end: "center center",
              scrub: 1,
              invalidateOnRefresh: true, // Recalculates getTransform() on window resize
            }
          });

          // Translate X/Y over the exact pixel delta between sections
          tl.to(wrapper, {
            x: () => getTransform().x,
            y: () => getTransform().y,
            scaleX: () => getTransform().scaleX,
            scaleY: () => getTransform().scaleY,
            ease: "power2.inOut",
            transformOrigin: "top left"
          }, 0);

          // Execute 3D flip synchronously with translation
          tl.to(inner, {
            rotateY: 180,
            ease: "power2.inOut"
          }, 0);
        });
      }
    }, 50);

    return () => {
      clearInterval(checkDOM);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      id={`${idPrefix}portrait-flip-card-wrapper`}
      className="relative w-full max-w-[150px] md:max-w-[200px] aspect-[4/4.5] z-[100] pointer-events-none"
      style={{ perspective: "1200px" }}
    >
      <div
        ref={innerRef}
        className="w-full h-full relative preserve-3d"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-border backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={backImg}
            alt="Majd Portrait Silhouette"
            className="w-full h-full object-cover grayscale brightness-90 contrast-105"
            referrerPolicy="no-referrer"
          />
        </div>

        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-border backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <img
            src={frontImg}
            alt="Majd Portrait Face Reveal"
            className="w-full h-full object-cover grayscale brightness-95"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
};