import React, { useState, useEffect } from "react";
import { SplitText } from "../ui/SplitText";
import { MagneticButton } from "../ui/MagneticButton";
import { ScrollReveal } from "../ui/ScrollReveal";
import cvFile from "../../assets/CV/My_Resume.pdf";
import { useLang } from "../../context/LanguageContext";

interface BioProps {
  setRoute: (route: string) => void;
}

export const Bio: React.FC<BioProps> = ({ setRoute }) => {
  const [inView, setInView] = useState(false);
  const { lang } = useLang();

  useEffect(() => {
    const element = document.getElementById("about-section");
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const handleContactClick = () => {
    const contactSec = document.getElementById("contact-section");
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  const t = {
    intro: lang === "ID"
      ? <>Saya <strong className="font-semibold text-black">Riski</strong>, seorang Front-End Developer yang berbasis di Indonesia, saat ini sedang menjalani <strong className="font-semibold text-black">freelance</strong></>
      : <>I'm <strong className="font-semibold text-black">Riski</strong>, a Front-End Developer based in Indonesia, currently now doing <strong className="font-semibold text-black">freelance</strong></>,
    desc1: lang === "ID"
      ? "Saya adalah Fresh Graduate Software Engineer dengan fokus kuat dalam membangun pengalaman web yang modern, skalabel, dan berorientasi konversi. Saya menjembatani rekayasa teknis dengan kemurnian desain interaktif yang estetis."
      : "I'm a Fresh Graduate Software Engineer with a strong focus on building modern, scalable, and conversion-driven web experiences. I bridge the technical frontier of custom engineering with the aesthetic purity of intentional interactive design.",
    desc2: lang === "ID"
      ? "Selama 3 tahun ini, saya telah belajar dan mengerjakan berbagai proyek website serta sistem manajemen untuk berbagai klien."
      : "Over the 3 years, I've learning and created multiple project website and management systems for their clients.",
    cvBtn: lang === "ID" ? "Resume Saya" : "My Resume",
    contactBtn: lang === "ID" ? "Hubungi Saya" : "Contact Me",
  };

  return (
    <section
      id="about-section"
      className="relative w-full py-32 bg-[#f2f1ed]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-3 select-none pt-4">
            <h2 className="font-sans font-bold text-[80px] md:text-[110px] leading-none text-black uppercase tracking-tight">
              <SplitText 
                text="Hey!" 
                trigger={inView} 
                delay={0.1}
                duration={0.8}
              />
            </h2>
          </div>

          {/* Center Column: Invisible target for the animated image */}
          <div className="lg:col-span-4 flex justify-center w-full ">
             <div id="bio-image-target" className="w-full aspect-[3/3.8] rounded-2xl invisible pointer-events-none ml-5" />
          </div>

          {/* Right Column: Text block */}
          <div className="lg:col-span-5 flex flex-col gap-8 pt-4">
            <ScrollReveal y={30} delay={0.2} duration={0.8} once={true}>
              <p className="font-sans text-xl md:text-2xl text-black leading-relaxed font-light">
                {t.intro}
              </p>
            </ScrollReveal>

            <ScrollReveal y={30} delay={0.35} duration={0.8} once={true}>
              <p className="font-body text-base md:text-lg text-black/70 leading-relaxed font-normal">
                {t.desc1}
              </p>
            </ScrollReveal>

            <ScrollReveal y={30} delay={0.5} duration={0.8} once={true}>
              <p className="font-body text-base md:text-lg text-black/70 leading-relaxed font-normal">
                {t.desc2}
              </p>
            </ScrollReveal>

            <ScrollReveal y={20} delay={0.65} duration={0.6} once={true} className="mt-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <a
                href={cvFile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <MagneticButton
                  className="w-full sm:w-auto group border border-black/20 hover:border-black px-8 py-4 rounded-full bg-black text-white hover:bg-transparent hover:text-black font-sans font-medium text-sm uppercase tracking-widest transition-colors flex items-center justify-center"
                >
                  {t.cvBtn}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-y-0.5 ml-2">
                    →
                  </span>
                </MagneticButton>
              </a>

              <MagneticButton
                onClick={handleContactClick}
                className="w-full sm:w-auto group border border-black/20 hover:border-black px-8 py-4 rounded-full bg-transparent hover:bg-black text-black hover:text-white font-sans font-medium text-sm uppercase tracking-widest transition-colors flex items-center justify-center"
              >
                {t.contactBtn}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-2">
                  →
                </span>
              </MagneticButton>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
