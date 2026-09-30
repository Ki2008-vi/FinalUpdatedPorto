import React, { useEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";
import { X, MoreHorizontal } from "lucide-react";

interface NavbarProps {
  currentRoute: string;
  setRoute: (route: string) => void;
  language?: "EN" | "ID";
  onLanguageChange?: (lang: "EN" | "ID") => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  setRoute,
  language,
  onLanguageChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [internalLang, setInternalLang] = useState<"EN" | "ID">("EN");
  const navContainerRef = useRef<HTMLDivElement>(null);

  const currentLang = language ?? internalLang;

  const handleLanguageChange = (newLang: "EN" | "ID") => {
    if (onLanguageChange) {
      onLanguageChange(newLang);
    } else {
      setInternalLang(newLang);
    }
  };

  useEffect(() => {
    // Elegant entrance animation for the floating bar
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navContainerRef.current,
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          delay: 0.8,
        }
      );
    }, navContainerRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);

    if (currentRoute !== "/") {
      setRoute("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    { label: currentLang === "ID" ? "Tentang Saya" : "About Me", target: "about-section" },
    { label: currentLang === "ID" ? "Layanan" : "Services", target: "services-section" },
    { label: currentLang === "ID" ? "Proyek" : "Projects", target: "works-section" },
    { label: currentLang === "ID" ? "Kontak" : "Contact", target: "contact-section" },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-60 px-4 pointer-events-none flex justify-center">
      <div
        ref={navContainerRef}
        className={`bg-[#0d0d0d] text-white shadow-2xl border border-white/[0.04] backdrop-blur-md pointer-events-auto transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          mobileMenuOpen 
            ? "rounded-[28px] p-6 min-w-[320px]" 
            : "rounded-[20px] p-2 pl-6 pr-2 min-w-[300px]"
        }`}
      >
        {/* HEADER BLOCK (Always visible) */}
        <div className="flex items-center justify-between gap-4 w-full">
          <button
            onClick={() => handleNavClick("hero-section")}
            className="font-sans font-bold text-[22px] text-white hover:opacity-75 cursor-pointer select-none"
          >
            Ki
          </button>

          <div className="flex items-center gap-3">
            {/* Language Switcher Button (EN / ID) */}
            <div className="flex items-center bg-white/10 p-1 rounded-[12px] text-xs font-sans select-none border border-white/5">
              <button
                onClick={() => handleLanguageChange("EN")}
                className={`px-2.5 py-1 rounded-[8px] font-medium transition-all duration-200 cursor-pointer ${
                  currentLang === "EN"
                    ? "bg-[#fcfbf7] text-black font-semibold shadow-sm"
                    : "text-white/70 hover:text-white"
                }`}
                aria-label="Switch language to English"
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange("ID")}
                className={`px-2.5 py-1 rounded-[8px] font-medium transition-all duration-200 cursor-pointer ${
                  currentLang === "ID"
                    ? "bg-[#fcfbf7] text-black font-semibold shadow-sm"
                    : "text-white/70 hover:text-white"
                }`}
                aria-label="Switch language to Indonesian"
              >
                ID
              </button>
            </div>

            {/* Action Toggle Square Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-[12px] bg-[#fcfbf7] text-black hover:bg-[#f2f1ed] transition-colors cursor-pointer duration-200"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? (
                <X size={18} strokeWidth={2.5} />
              ) : (
                <MoreHorizontal size={18} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>

        {/* EXPANDED VERTICAL MENU LINKS */}
        <div
          className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen 
              ? "grid-rows-[1fr] opacity-100 mt-4" 
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden flex flex-col gap-1 items-start w-full">
            {menuItems.map((item, index) => (
              <button
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                style={{ transitionDelay: mobileMenuOpen ? `${index * 40}ms` : '0ms' }}
                className={`w-full font-archivo font-medium text-[14px] bg-[#fcfbf7] text-black px-5 py-2.5 rounded-[12px] transition-all hover:bg-[#f2f1ed] hover:scale-[1.02] active:scale-[0.98] text-left cursor-pointer shadow-sm transform duration-200 ${
                  mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};