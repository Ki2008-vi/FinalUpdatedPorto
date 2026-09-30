import React, { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  trigger?: boolean; // If true, triggers immediately; otherwise wait
  onComplete?: () => void;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 0,
  duration = 0.9,
  stagger = 0.08,
  trigger = true,
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trigger || !containerRef.current) return;

    const words = containerRef.current.querySelectorAll(".word-inner");
    
    // Set initial custom style to avoid layout shifts and hide initially
    gsap.set(words, { y: "120%" });

    const ctx = gsap.context(() => {
      gsap.to(words, {
        y: "0%",
        duration,
        delay,
        stagger,
        ease: "power4.out",
        onComplete: onComplete,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [text, trigger, delay, duration, stagger]);

  // Split sentence by space
  const wordsArray = text.split(" ");

  return (
    <span
      ref={containerRef}
      className={`inline-flex flex-wrap ${className}`}
      id={`split-text-${text.slice(0, 10).toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
    >
      {wordsArray.map((word, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden mr-[0.25em] py-[0.1em] -my-[0.1em]"
        >
          <span className="word-inner inline-block transform will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </span>
  );
};
