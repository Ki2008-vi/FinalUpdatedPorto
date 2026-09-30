import React, { useEffect } from "react";
import { projects } from "../../data/projects";
import { ScrollReveal } from "../ui/ScrollReveal";

interface WorkPageProps {
  setRoute: (route: string) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ setRoute }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as any });
  }, []);

  return (
    <main className="min-h-screen bg-[#F4F3EF] text-[#111111] pt-32 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Hero Header */}
        <div className="mb-20 select-none">
          <ScrollReveal y={25} duration={0.8}>
            <h1 className="font-sans font-bold tracking-tight text-6xl sm:text-7xl lg:text-[80px] text-black mb-4 leading-none">
              Works
            </h1>
            <p className="font-sans text-lg md:text-xl text-black/60 max-w-[540px] font-medium leading-relaxed">
              A selection of Landing Page and custom software projects built with raw intention and structured speed.
            </p>
          </ScrollReveal>
        </div>

        {/* 2-Column Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {projects.map((proj, idx) => (
            <ScrollReveal
              key={proj.slug}
              y={40}
              delay={idx * 0.1}
              duration={0.8}
              once={true}
            >
              <div
                onClick={() => setRoute(`/work/${proj.slug}`)}
                className="group cursor-pointer flex flex-col"
              >
                {/* Image Panel */}
                <div className="w-full aspect-[16/10] rounded-[24px] overflow-hidden bg-white/40 border border-black/10 p-4 flex items-center justify-center relative transition-transform duration-500 ease-out group-hover:scale-[1.01]">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="max-h-full max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Meta details */}
                <div className="flex flex-col gap-1 mt-4 pl-1">
                  <h3 className="font-sans font-bold text-2xl text-black tracking-tight">
                    {proj.title}
                  </h3>
                  <p className="font-sans text-[15px] text-black/60 font-medium">
                    {proj.category || proj.type}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </main>
  );
};