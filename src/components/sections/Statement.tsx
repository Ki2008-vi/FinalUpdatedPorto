import React, { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useLang } from "../../context/LanguageContext";

export const Statement: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const { lang } = useLang();

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const words = el.querySelectorAll(".reveal-word");
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.8,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  const statementText = lang === "ID"
    ? "Dari ide hingga peluncuran. Produk digital yang bersih dan skalabel, dibangun untuk bergerak cepat, tetap sederhana, dan tampil optimal di dunia nyata — digerakkan oleh kejernihan, sistem terstruktur, dan desain yang penuh tujuan."
    : "From idea to launch. Clean, scalable digital products built to move fast, stay simple, and perform in real-world use, driven by clarity, structured systems, and intentional design.";

  const wordsArray = statementText.split(" ");

  return (
    <section
      ref={sectionRef}
      id="statement-section"
      className="relative w-full py-36 md:py-48 bg-[#f2f1ed] flex items-center justify-center overflow-hidden border-b border-black/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-center text-center">
        <p
          ref={textRef}
          className="font-sans font-medium text-[28px] sm:text-[40px] md:text-[52px] lg:text-[60px] leading-[1.2] tracking-tight text-black max-w-5xl select-none"
        >
          {wordsArray.map((word, idx) => (
            <span
              key={idx}
              className="reveal-word inline-block mr-[0.24em] will-change-[opacity]"
              style={{ opacity: 0.15 }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};
