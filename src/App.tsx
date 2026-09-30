import React, { useState, useEffect } from "react";
import { initLenis } from "./lib/lenis";
import { LanguageProvider, useLang } from "./context/LanguageContext";

// Layout components
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

// UI Components

// Sections
import { Hero } from "./components/sections/Hero";
import { Bio } from "./components/sections/Bio";
import { Statement } from "./components/sections/Statement";
import { Skills } from "./components/sections/Skills";
import { Services } from "./components/sections/Services";
import { Projects } from "./components/sections/Projects";
import { Testimonials } from "./components/sections/Testimonials";
import { Contact } from "./components/sections/Contact";

// Pages
import { WorkPage } from "./components/pages/WorkPage";
import { ProjectDetailPage } from "./components/pages/ProjectDetailPage";
import { BlogPage } from "./components/pages/BlogPage";
import { BlogDetailPage } from "./components/pages/BlogDetailPage";

// Data arrays
import { projects } from "./data/projects";
import { blogs } from "./data/blog";

function AppInner() {
  const [currentRoute, setCurrentRoute] = useState("/");
  const { lang, setLang } = useLang();

  // Synchronous route listener based on url location hash mechanism
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || "#/";
      const cleaned = hash.replace(/^#/, "");
      setCurrentRoute(cleaned === "" ? "/" : cleaned);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Run initial parsing of current URL on index render

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Initialize Lenis smooth scroll globally
  useEffect(() => {
    const scrollInstance = initLenis();
    
    // Refresh layout anchors and triggers
    setTimeout(() => {
      import("./lib/gsap").then(({ ScrollTrigger }) => {
        ScrollTrigger.refresh();
      });
    }, 500);

    return () => {
      scrollInstance.destroy();
    };
  }, [currentRoute]);

  // Set Router state navigation mechanism updating location hash URL value
  const setRoute = (route: string) => {
    window.location.hash = route === "/" ? "" : route;
  };

  // Route Parser & Page Switch Selector
  const renderCurrentView = () => {
    // 1. Single Project Detail Page check
    if (currentRoute.startsWith("/work/")) {
      const slug = currentRoute.replace("/work/", "");
      const projectItem = projects.find((p) => p.slug === slug);
      if (projectItem) {
        return <ProjectDetailPage project={projectItem} setRoute={setRoute} />;
      }
    }

    // 2. Single Blog Detail Page check
    if (currentRoute.startsWith("/blog/")) {
      const slug = currentRoute.replace("/blog/", "");
      const postItem = blogs.find((b) => b.slug === slug);
      if (postItem) {
        return <BlogDetailPage post={postItem} setRoute={setRoute} />;
      }
    }

    // 3. Work Listing View
    if (currentRoute === "/work") {
      return <WorkPage setRoute={setRoute} />;
    }

    // 4. Blog Listing View
    if (currentRoute === "/blog") {
      return <BlogPage setRoute={setRoute} />;
    }

    // Default Main View - Homepage index section cluster
    return (
      <main className="w-full relative bg-[#0a0a0a]">
        <Hero />
        <Bio setRoute={setRoute} />
        <Statement />
        <Skills />
        <Services />
        <Projects setRoute={setRoute} />
        <Testimonials />
        <Contact />
      </main>
    );
  };

  return (
    <div id="majd-portfolio-clone-application" className="relative min-h-screen bg-[#0a0a0a] text-text font-body selection:bg-white selection:text-black">
      {/* 2. Primary fixed-blur navigation bar */}
      <Navbar
        currentRoute={currentRoute}
        setRoute={setRoute}
        language={lang}
        onLanguageChange={setLang}
      />

      {/* 3. Render dynamically routed layout content */}
      <div id="renderer-body-panel">
        {renderCurrentView()}
      </div>

      {/* 4. Global footer design and credits */}
      <Footer setRoute={setRoute} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}

