import React, { useEffect, useState } from "react";
import { Project } from "../../types";
import { projects } from "../../data/projects";
import { ScrollReveal } from "../ui/ScrollReveal";

interface ProjectDetailPageProps {
  project: Project;
  setRoute: (route: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  setRoute,
}) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as any });
  }, [project]);

  // Handle escape key and body scroll lock for lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImage(null);
      }
    };
    if (activeImage) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="min-h-screen bg-[#F4F3EF] text-[#111111] pt-32 pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Project Header Title & Description Section */}
        <div className="mb-12">
          <ScrollReveal y={20} duration={0.8}>
            <h1 className="font-sans font-bold text-5xl sm:text-7xl lg:text-[80px] text-black tracking-tight mb-4 leading-none">
              {project.title}
            </h1>
            <p className="font-sans text-lg md:text-xl text-black/60 font-medium">
              {project.category}
            </p>
          </ScrollReveal>
        </div>

        {/* Hero visual image */}
        <ScrollReveal y={40} duration={1.0} className="w-full mb-16 rounded-[24px] overflow-hidden bg-white/40 border border-black/10 flex items-center justify-center p-4 md:p-8">
          <div className="w-full flex items-center justify-center">
            <img
              src={project.image}
              alt={project.title}
              onClick={() => setActiveImage(project.image)}
              className="max-h-[75vh] w-auto h-auto max-w-full object-contain rounded-[16px] cursor-zoom-in hover:opacity-95 transition-opacity duration-300 shadow-sm"
              referrerPolicy="no-referrer"
            />
          </div>
        </ScrollReveal>

        {/* 2-Column Split: Detailed Info Description Left, Sidebar Details Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24 border-b border-black/10 pb-20">
          
          {/* Left Column Description */}
          <div className="lg:col-span-8 flex flex-col gap-6 text-left">
            <ScrollReveal y={25} duration={0.8} once={true}>
              <h2 className="font-sans font-semibold text-2xl md:text-3xl text-black mb-6 tracking-tight">
                Overview
              </h2>
              <p className="font-sans text-base sm:text-lg text-black/70 leading-relaxed">
                {project.description}
              </p>
              <p className="font-sans text-base sm:text-lg text-black/70 leading-relaxed mt-4">
                To build this, strict user interface standards were maintained, focusing heavily on modern, accessible contrast levels and highly responsive container models. Section boundaries utilize crisp border assets instead of noisy shadows to maintain a premium visual style.
              </p>
              <p className="font-sans text-base sm:text-lg text-black/70 leading-relaxed mt-4">
                The product focuses on optimizing page speed indicators. Every element was structured dynamically to allow seamless customization, resulting in high organic retention rates and zero maintenance delays.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column Sidebar Metadata */}
          <div className="lg:col-span-4 bg-white/40 border border-black/10 p-8 rounded-[24px] flex flex-col gap-6">
            <ScrollReveal y={25} duration={0.8} once={true}>
              <h3 className="font-sans font-semibold text-xl text-black border-b border-black/10 pb-4 mb-6 tracking-tight">
                Details
              </h3>

              <div className="flex flex-col gap-6 font-sans">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-black/50 font-medium tracking-wide uppercase">Year</span>
                  <span className="text-black font-medium text-lg">{project.year}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-black/50 font-medium tracking-wide uppercase">Type</span>
                  <span className="text-black font-medium text-lg">{project.type}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-black/50 font-medium tracking-wide uppercase">Role</span>
                  <span className="text-black font-medium text-lg">{project.role}</span>
                </div>
                <div className="flex flex-col gap-1 pt-2">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium text-sm hover:bg-black/80 transition-colors w-fit"
                  >
                    <span>REPO</span>
                    <span className="text-xs">↗</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Additional full-width mockup layouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {project.mockups.map((mk, idx) => (
            <ScrollReveal
              key={`${idx}`}
              y={40}
              delay={idx * 0.15}
              duration={0.8}
              className="w-full rounded-[24px] overflow-hidden bg-white/40 border border-black/10 flex items-center justify-center p-4"
            >
              <div className="w-full aspect-[3/2] flex items-center justify-center">
                <img
                  src={mk}
                  alt={`${project.title} detailed layout screen ${idx + 1}`}
                  onClick={() => setActiveImage(mk)}
                  className="max-h-full max-w-full object-contain rounded-[12px] transition-all duration-300 hover:scale-[1.02] cursor-zoom-in"
                  referrerPolicy="no-referrer"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Next-Project Navigation Link Container */}
        <ScrollReveal y={30} duration={0.8} className="w-full">
          <div
            onClick={() => setRoute(`/work/${nextProject.slug}`)}
            className="group cursor-pointer border border-black/10 hover:border-black/20 bg-white/50 rounded-[32px] p-10 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-8 transition-all duration-300 hover:shadow-sm"
          >
            <div className="flex flex-col text-left">
              <span className="font-sans text-sm tracking-wide text-black/50 uppercase mb-3 font-medium">
                Next Project
              </span>
              <h2 className="font-sans font-bold text-4xl sm:text-5xl text-black tracking-tight transition-colors">
                {nextProject.title}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-full border border-black/20 group-hover:border-black group-hover:bg-black text-black group-hover:text-white flex items-center justify-center font-sans text-2xl transition-all duration-300 shrink-0">
              →
            </div>
          </div>
        </ScrollReveal>

      </div>

      {/* Lightbox Modal Overlay */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md cursor-zoom-out animate-fade-in-fast"
          onClick={() => setActiveImage(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 z-55 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-3xl font-light transition-all duration-200 hover:scale-110 focus:outline-none"
            aria-label="Close image preview"
          >
            &times;
          </button>
          
          {/* Zoomed Image */}
          <div
            className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage}
              alt="Project zoom view"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-zoom-in"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </main>
  );
};