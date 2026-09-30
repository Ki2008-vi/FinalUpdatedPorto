import React, { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

interface MarqueeProps {
  text?: string;
  speed?: number; // duration of one loop
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  text = "From idea to launch. Clean, scalable digital products built to move fast, stay simple, and perform in real-world use, driven by clarity, structured systems, and intentional design.",
  speed = 40,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    // We animate translation of the inner scroll element by -50%
    const tween = gsap.to(scrollEl, {
      xPercent: -50,
      ease: "none",
      duration: speed,
      repeat: -1,
    });

    tweenRef.current = tween;

    return () => {
      tween.kill();
    };
  }, [speed]);

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.25, duration: 0.6, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1.0, duration: 0.6, ease: "power2.out" });
    }
  };

  // We repeat the text to ensure it covers the screens and loops seamlessly
  const repeatedText = Array(4).fill(text);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-surface py-5 border-y border-border cursor-pointer select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      id="marquee-strip-container"
    >
      <div
        ref={scrollRef}
        className="flex whitespace-nowrap will-change-transform font-sans"
        style={{ width: "max-content" }}
      >
        {/* Render twice for seamless looping */}
        <div className="flex gap-8 px-4 text-[14px] md:text-[16px] leading-none uppercase tracking-[0.2em] font-medium text-text">
          {repeatedText.map((chunk, itemIdx) => (
            <span key={`chunk-1-${itemIdx}`} className="flex items-center gap-8">
              <span>{chunk}</span>
              <span className="text-muted text-[10px]">◆</span>
            </span>
          ))}
        </div>
        <div className="flex gap-8 px-4 text-[14px] md:text-[16px] leading-none uppercase tracking-[0.2em] font-medium text-text">
          {repeatedText.map((chunk, itemIdx) => (
            <span key={`chunk-2-${itemIdx}`} className="flex items-center gap-8">
              <span>{chunk}</span>
              <span className="text-muted text-[10px]">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
