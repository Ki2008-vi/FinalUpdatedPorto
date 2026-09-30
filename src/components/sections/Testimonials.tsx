import React, { useState } from "react";
import { useLang } from "../../context/LanguageContext";
import { ScrollReveal } from "../ui/ScrollReveal";
import { educationAndCertificates, EducationItem } from "../../data/education";
import { GraduationCap, Award, Building2, Calendar, CheckCircle2, Sparkles } from "lucide-react";

export const Testimonials: React.FC = () => {
  const { lang } = useLang();
  const [activeFilter, setActiveFilter] = useState<"all" | "education" | "certificate">("all");

  const title = lang === "ID" ? "Pendidikan & Sertifikasi" : "Education & Certificates";
  const subtitle = lang === "ID" 
    ? "Latar belakang akademik dan sertifikasi profesional dalam pengembangan web & teknologi."
    : "Academic background and professional certifications in web development & technology.";

  const filteredItems = educationAndCertificates.filter((item) => {
    if (activeFilter === "all") return true;
    return item.type === activeFilter;
  });

  return (
    <section
      id="testimonials-section"
      className="relative w-full py-28 md:py-36 bg-[#f2f1ed] text-[#111111]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-12 md:mb-16 select-none flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <ScrollReveal y={20} delay={0.1} duration={0.6}>
              <h2 className="font-sans font-bold tracking-tight text-4xl sm:text-6xl lg:text-[72px] leading-tight text-[#111111]">
                {title}
              </h2>
            </ScrollReveal>
            <ScrollReveal y={20} delay={0.2} duration={0.6}>
              <p className="mt-3 text-base sm:text-lg text-[#111111]/70 max-w-2xl font-sans">
                {subtitle}
              </p>
            </ScrollReveal>
          </div>

          {/* Filter Tabs */}
          <ScrollReveal y={20} delay={0.3} duration={0.6}>
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#111111]/5 border border-[#111111]/10 self-start md:self-auto">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeFilter === "all"
                    ? "bg-[#111111] text-white shadow-md"
                    : "text-[#111111]/70 hover:text-[#111111]"
                }`}
              >
                {lang === "ID" ? "Semua" : "All"} ({educationAndCertificates.length})
              </button>
              <button
                onClick={() => setActiveFilter("education")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  activeFilter === "education"
                    ? "bg-[#111111] text-white shadow-md"
                    : "text-[#111111]/70 hover:text-[#111111]"
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>{lang === "ID" ? "Pendidikan" : "Education"}</span>
              </button>
              <button
                onClick={() => setActiveFilter("certificate")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  activeFilter === "certificate"
                    ? "bg-[#111111] text-white shadow-md"
                    : "text-[#111111]/70 hover:text-[#111111]"
                }`}
              >
                <Award className="w-4 h-4" />
                <span>{lang === "ID" ? "Sertifikat" : "Certificates"}</span>
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredItems.map((item, idx) => {
            const isEdu = item.type === "education";
            return (
              <ScrollReveal
                key={item.id}
                y={40}
                delay={idx * 0.1}
                duration={0.8}
                className="h-full"
              >
                <div
                  id={`edu-cert-card-${item.id}`}
                  className="group relative w-full h-full min-h-[320px] rounded-[24px] bg-[#f2f1ed] p-8 flex flex-col justify-between border border-black/10 hover:border-black/20 transition-all duration-300 hover:shadow-xl"
                >
                  {/* Top Bar: Icon Badge + Period */}
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center text-[#111111] group-hover:bg-black/15 transition-colors">
                          {isEdu ? (
                            <GraduationCap className="w-5 h-5" />
                          ) : (
                            <Award className="w-5 h-5" />
                          )}
                        </div>
                        <span className="px-3 py-1 rounded-full bg-black/10 text-xs font-semibold text-[#111111]/80 uppercase tracking-wider">
                          {isEdu
                            ? lang === "ID" ? "Pendidikan" : "Education"
                            : lang === "ID" ? "Sertifikasi" : "Certificate"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-medium text-[#111111]/70 bg-black/5 px-3 py-1 rounded-full border border-black/10">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-sans font-bold text-xl sm:text-2xl text-[#111111] tracking-tight leading-snug">
                      {item.title[lang]}
                    </h3>

                    {/* Institution */}
                    <div className="flex items-center gap-2 mt-2 mb-4 text-sm font-medium text-[#111111]/70">
                      <Building2 className="w-4 h-4 text-[#111111]/50 flex-shrink-0" />
                      <span>{item.institution}</span>
                    </div>

                    {/* Description */}
                    <p className="font-sans text-sm text-[#111111]/80 leading-relaxed">
                      {item.description[lang]}
                    </p>

                    {/* Grade / Rating Badge */}
                    {item.grade && (
                      <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-#f2f1ed border border-black text-black-700 text-xs font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{item.grade}</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom: Skills Tags */}
                  {item.skills && item.skills.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-black/10 flex flex-wrap gap-2">
                      {item.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-md bg-black/5 border border-black/10 text-xs text-[#111111]/80 font-sans font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};