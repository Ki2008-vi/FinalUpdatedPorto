import React, { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  className?: string;
  triggerOffset?: string; // e.g. "85%"
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  y = 40,
  once = true,
  className = "",
  triggerOffset = "85%",
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Set initial state
    gsap.set(el, { y, opacity: 0 });

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: `top ${triggerOffset}`,
          toggleActions: once ? "play none none none" : "play reverse play reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, duration, y, once, triggerOffset]);

  return (
    <div ref={elementRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};
