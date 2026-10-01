import React, { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

interface ElasticHeroTextProps {
  lines?: string[];
  trigger?: boolean;
  className?: string;
  onComplete?: () => void;
}

export const ElasticHeroText: React.FC<ElasticHeroTextProps> = ({
  lines = ["HI", "MATE"],
  trigger = true,
  className = "",
  onComplete,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trigger || !stageRef.current) return;

    const stage = stageRef.current;
    const chars = Array.from(stage.querySelectorAll<HTMLSpanElement>(".char"));
    if (chars.length === 0) return;

    const numChars = chars.length;
    const body = document.body;
    const style = getComputedStyle(body);

    const fwRaw = style.getPropertyValue("--fw").trim();
    const fsRaw = style.getPropertyValue("--fs").trim();
    const weightInit = fwRaw ? parseFloat(fwRaw) : 900;
    const weightTarget = 400;
    const weightDiff = weightInit - weightTarget;
    const stretchInit = fsRaw ? parseFloat(fsRaw) : 100;
    const stretchTarget = 70;
    const stretchDiff = stretchInit - stretchTarget;
    const maxYScale = 2.5;
    const elasticDropOff = 0.8;

    let isMouseDown = false;
    let mouseInitialY = 0;
    let mouseFinalY = 0;
    let distY = 0;
    let charIndexSelected = 0;
    let charH = 120;
    let dragYScale = 0;
    let eventsAttached = false;

    const resize = () => {
      if (chars[0]) {
        charH = chars[0].offsetHeight || 120;
      }
    };

    const calcDist = () => {
      const maxYDragDist = charH * (maxYScale - 1);
      distY = mouseInitialY - mouseFinalY;
      dragYScale = distY / maxYDragDist;
      if (dragYScale > maxYScale - 1) {
        dragYScale = maxYScale - 1;
      } else if (dragYScale < -0.5) {
        dragYScale = -0.5;
      }
    };

    const calcfracDispersion = (index: number) => {
      const dispersion = 1 - Math.abs(index - charIndexSelected) / (numChars * elasticDropOff);
      return Math.max(0, dispersion) * dragYScale;
    };

    const setFontDragDimensions = () => {
      gsap.to(chars, {
        y: (index: number) => {
          const fracDispersion = calcfracDispersion(index);
          return fracDispersion * -50;
        },
        fontWeight: (index: number) => {
          const fracDispersion = calcfracDispersion(index);
          return Math.max(100, Math.min(900, Math.round(weightInit - fracDispersion * weightDiff)));
        },
        fontStretch: (index: number) => {
          const fracDispersion = calcfracDispersion(index);
          return `${Math.max(62.5, Math.min(125, Math.round(stretchInit - fracDispersion * stretchDiff)))}%`;
        },
        scaleY: (index: number) => {
          const fracDispersion = calcfracDispersion(index);
          let sY = 1 + fracDispersion;
          if (sY < 0.5) sY = 0.5;
          return sY;
        },
        ease: "power4.out",
        duration: 0.6,
        overwrite: "auto",
      });
    };

    const snapBackText = () => {
      gsap.to(chars, {
        y: 0,
        fontWeight: weightInit,
        fontStretch: `${stretchInit}%`,
        scale: 1,
        ease: "elastic(0.35, 0.1)",
        duration: 1,
        stagger: {
          each: 0.02,
          from: charIndexSelected,
        },
        overwrite: "auto",
      });
    };

    const handlePointerDown = (e: PointerEvent, index: number) => {
      e.preventDefault();
      mouseInitialY = e.clientY;
      charIndexSelected = index;
      isMouseDown = true;
      body.classList.add("grab");
      gsap.killTweensOf(chars);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isMouseDown) return;
      mouseFinalY = e.clientY;
      calcDist();
      setFontDragDimensions();
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (isMouseDown) {
        mouseFinalY = e.clientY;
        isMouseDown = false;
        snapBackText();
        body.classList.remove("grab");
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= 0 ||
        e.clientX <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        if (isMouseDown) {
          snapBackText();
          isMouseDown = false;
          body.classList.remove("grab");
        }
      }
    };

    const handleBlur = () => {
      if (isMouseDown) {
        snapBackText();
        isMouseDown = false;
        body.classList.remove("grab");
      }
    };

    const charListeners: Array<{ elem: HTMLSpanElement; handler: (e: PointerEvent) => void }> = [];

    const initEvents = () => {
      if (eventsAttached) return;
      eventsAttached = true;

      chars.forEach((charElem, index) => {
        const handler = (e: PointerEvent) => handlePointerDown(e, index);
        charElem.addEventListener("pointerdown", handler);
        charListeners.push({ elem: charElem, handler });
      });

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerUp);
      document.body.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("blur", handleBlur);
      window.addEventListener("resize", resize);
    };

    const animInTxt = () => {
      const elem = chars[0];
      const rect = elem.getBoundingClientRect();
      gsap.from(chars, {
        y: () => -1 * (rect.y + charH + 500),
        fontWeight: weightTarget,
        fontStretch: `${stretchTarget}%`,
        scaleY: 2,
        ease: "elastic(0.2, 0.1)",
        duration: 1.5,
        delay: 0.2,
        stagger: {
          each: 0.05,
          from: "random",
        },
        onComplete: () => {
          initEvents();
          if (onComplete) onComplete();
        },
      });
    };

    // Initialize layout & animation
    resize();
    gsap.set(stage, { autoAlpha: 1 });
    gsap.set(chars, { transformOrigin: "center bottom" });
    animInTxt();

    return () => {
      body.classList.remove("grab");
      charListeners.forEach(({ elem, handler }) => {
        elem.removeEventListener("pointerdown", handler);
      });
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("resize", resize);
      gsap.killTweensOf(chars);
      gsap.killTweensOf(stage);
    };
  }, [trigger, lines, onComplete]);

  return (
    <div
      ref={stageRef}
      className={`stage flex flex-col items-center select-none w-full ${className}`}
      style={{ visibility: "hidden" }}
    >
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block tracking-[0.01em] overflow-visible">
          {line.split("").map((char, charIdx) => (
            <span
              key={charIdx}
              className="char inline-block will-change-transform cursor-grab active:cursor-grabbing select-none"
              style={{
                transformOrigin: "center bottom",
                display: "inline-block",
                touchAction: "none",
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
};
