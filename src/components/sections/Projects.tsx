import React from "react";
import { projects } from "../../data/projects";
import { ScrollReveal } from "../ui/ScrollReveal";
import { useLang } from "../../context/LanguageContext";

interface ProjectsProps {
  setRoute: (route: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ setRoute }) => {
  const { lang } = useLang();
  // Constrain the display to exactly 4 projects
  const displayedProjects = projects.slice(0, 4);

  const t = {
    heading: lang === "ID" ? "Proyek Unggulan" : "Featured Projects",
    viewAll: lang === "ID" ? "Lihat Semua" : "View All Work",
  };

  return (
    <section
      id="works-section"
      className="relative w-full py-32 bg-[#F4F3EF] text-[#111111]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading & View All Button Row */}
        <div className="flex flex-row items-end justify-between gap-6 mb-20 select-none">
          <ScrollReveal y={20} duration={0.6}>
            <h2 className="font-sans font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[80px] text-black leading-[0.9] tracking-tight max-w-xs sm:max-w-md">
              {t.heading}
            </h2>
          </ScrollReveal>
          
          <ScrollReveal y={20} delay={0.1} duration={0.6}>
            <button
              onClick={() => setRoute("/work")}
              className="group flex items-center gap-2 border border-black/20 hover:border-black rounded-full px-4 py-2 font-sans text-xs md:text-sm tracking-wide text-black transition-colors duration-300 cursor-pointer"
            >
              <span>{t.viewAll}</span>
              <span className="flex items-center justify-center w-5 h-5 border border-black/20 rounded-md text-[10px] font-bold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </button>
          </ScrollReveal>
        </div>

        {/* 2-Column Grid Layout for 4 Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {displayedProjects.map((project, index) => (
            <ScrollReveal
              key={project.slug}
              y={40}
              delay={index * 0.1}
              duration={0.8}
              once={true}
            >
              <div
                onClick={() => setRoute(`/work/${project.slug}`)}
                className="group cursor-pointer flex flex-col w-full"
              >
                {/* Visual Cover Container */}
                <div className="relative w-full aspect-[16/10] rounded-[24px] overflow-hidden bg-white/40 border border-black/10 p-4 flex items-center justify-center shadow-sm transition-transform duration-500 ease-out group-hover:scale-[1.01]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="max-h-full max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Meta Details */}
                <div className="mt-5 flex flex-col">
                  <h3 className="font-sans font-semibold text-2xl md:text-3xl text-black tracking-tight transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="font-sans text-sm md:text-base text-black/60 mt-1">
                    {project.category || "Framer Template"}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};