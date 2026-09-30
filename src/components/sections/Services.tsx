import React from "react";
import { ScrollReveal } from "../ui/ScrollReveal";
import { useLang } from "../../context/LanguageContext";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export const Services: React.FC = () => {
  const { lang } = useLang();

  const servicesData: ServiceItem[] = lang === "ID"
    ? [
        {
          id: "01",
          title: "Migrasi Website",
          description: "Memindahkan codebase lama yang kompleks ke arsitektur React kustom yang super cepat atau halaman Framer berkualitas tinggi, tanpa kehilangan integritas struktur maupun peringkat organik.",
          tags: ["Migrasi Web", "Optimasi"]
        },
        {
          id: "02",
          title: "Sistem Manajemen",
          description: "Membangun sistem manajemen untuk berbagai industri dengan fokus pada kemudahan penggunaan, performa, dan skalabilitas.",
          tags: ["Sistem Manajemen", "Optimasi", "Perangkat Lunak"]
        },
        {
          id: "03",
          title: "Pengembangan Frontend",
          description: "Membangun antarmuka pengguna yang mulus dan tangguh dengan tipografi sempurna, animasi (GSAP/Motion), dan performa Google Lighthouse kelas atas.",
          tags: ["UI Dev", "Tata Letak Responsif", "Performa Web"]
        },
        {
          id: "04",
          title: "Aplikasi Mobile",
          description: "Mengembangkan aplikasi mobile berperforma tinggi dan berpusat pada pengguna untuk platform iOS dan Android menggunakan teknologi terkini.",
          tags: ["Aplikasi Mobile", "iOS", "Android"]
        }
      ]
    : [
        {
          id: "01",
          title: "Website Migration",
          description: "Porting complex, legacy codebases over to lightning-fast custom React architecture or high-fidelity Framer pages without losing structural integrity or organic ranking.",
          tags: ["Web Migration", "Optimization"]
        },
        {
          id: "02",
          title: "Management System",
          description: "Building system management for industries with focus on ease of use, performance, and scalability.",
          tags: ["Management System", "Optimization", "Software"]
        },
        {
          id: "03",
          title: "Frontend Development",
          description: "Engineering tailored, fluid, and robust user interfaces with absolute typographic perfection, fluid animations (GSAP/Motion), and top-tier Google Lighthouse performance.",
          tags: ["UI Dev", "Responsive Layouts", "Web Performance"]
        },
        {
          id: "04",
          title: "Mobile Apps",
          description: "Developing high-performance, user-centric mobile applications for iOS and Android platforms using the latest technologies and best practices.",
          tags: ["Mobile Apps", "iOS", "Android"]
        }
      ];

  const sectionTitle = lang === "ID" ? "Layanan" : "Services";

  return (
    <section
      id="services-section"
      className="relative w-full py-32 bg-[#f2f1ed] text-[#111111]"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="mb-24 select-none">
          <ScrollReveal y={20} duration={0.6}>
            <h2 className="font-sans font-bold tracking-tight text-6xl sm:text-7xl lg:text-[80px]">
              {sectionTitle}
            </h2>
          </ScrollReveal>
        </div>

        {/* List Layout */}
        <div className="flex flex-col">
          {servicesData.map((service, index) => (
            <ScrollReveal
              key={service.id}
              y={30}
              delay={index * 0.1}
              duration={0.8}
            >
              <div
                id={`service-row-${service.id}`}
                className="group flex flex-col md:flex-row justify-between items-start md:items-center py-10 border-b border-black/10 hover:border-black/30 transition-colors duration-300"
              >
                {/* Left: Title */}
                <h3 className="font-sans font-medium text-2xl md:text-3xl text-black mb-4 md:mb-0">
                  {service.title}
                </h3>

                {/* Right: Dot-Separated Tags */}
                <div className="flex flex-wrap items-center font-sans text-sm md:text-base text-black/50">
                  {service.tags.map((tag, tagIndex) => (
                    <React.Fragment key={tag}>
                      <span className="tracking-wide">{tag}</span>
                      {tagIndex < service.tags.length - 1 && (
                        <span className="mx-3 text-black/30 md:mx-4">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};