import React from "react";

interface FooterProps {
  setRoute: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setRoute }) => {
  const handleAnchorClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      setRoute("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <footer
      id="app-main-footer"
      className="relative w-full bg-[#111111] text-white pt-28 pb-4 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-12">
          
          {/* Left Block: Headline Tagline */}
          <div className="lg:col-span-5 text-left">
            <h3 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] max-w-xs sm:max-w-sm md:max-w-md">
              Scaling Start-ups for Growth.
            </h3>
          </div>

          {/* Middle Block: Quick Links Buttons */}
          <div className="lg:col-span-4 flex flex-col items-start text-left lg:pl-12">
            <span className="text-lg font-sans font-medium text-white/50 mb-5">
              /Quick links
            </span>
            <div className="flex flex-wrap gap-2 max-w-xs">
              {[
                { name: "Home", id: "hero-section" },
                { name: "About Me", id: "about-section" },
                { name: "Services", id: "services-section" },
                { name: "Works", id: "works-section" },
                { name: "Contact", id: "contact-section" },
              ].map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleAnchorClick(link.id)}
                  className="bg-[#F4F3EF] text-black hover:opacity-90 font-sans text-sm font-semibold px-4 py-2 rounded-xl transition-opacity cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Block: Contact Label & Mail Address */}
          <div className="lg:col-span-3 flex flex-col items-start text-left">
            <span className="text-lg font-sans font-medium text-white/50 mb-5">
              /Contact
            </span>
            <a
              href="mailto:ganesriskipratama@gmail.com"
              className="font-sans text-lg font-medium text-white/90 hover:text-white transition-colors cursor-pointer"
            >
              ganesriskipratama@gmail.com
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};