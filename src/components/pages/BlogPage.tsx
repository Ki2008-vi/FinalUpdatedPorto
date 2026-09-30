import React, { useEffect } from "react";
import { blogs } from "../../data/blog";
import { ScrollReveal } from "../ui/ScrollReveal";

interface BlogPageProps {
  setRoute: (route: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ setRoute }) => {
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
              Thoughts
            </h1>
            <p className="font-sans text-lg md:text-xl text-black/60 max-w-[540px] font-medium leading-relaxed">
              Lessons, workflows, and art direction guidelines forged from shipping SaaS startups and Framer templates to global customers.
            </p>
          </ScrollReveal>
        </div>

        {/* Blog Post Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogs.map((post, index) => (
            <ScrollReveal
              key={post.slug}
              y={40}
              delay={index * 0.08}
              duration={0.8}
              once={true}
            >
              <div
                onClick={() => setRoute(`/blog/${post.slug}`)}
                className="group cursor-pointer bg-white border border-black/5 rounded-[24px] p-6 flex flex-col h-full shadow-sm hover:border-black/10 transition-all"
              >
                {/* Post Image Banner */}
                <div className="w-full aspect-[16/10] rounded-[16px] overflow-hidden bg-black/5 mb-6">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-2 text-xs font-medium text-black/50 mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Title & Description */}
                <div className="flex flex-col flex-grow justify-between gap-4">
                  <div>
                    <h3 className="font-sans font-bold text-xl sm:text-2xl text-black tracking-tight mb-2 group-hover:opacity-80 transition-opacity">
                      {post.title}
                    </h3>
                    <p className="font-sans text-sm text-black/60 line-clamp-2 font-medium leading-relaxed">
                      {post.subtitle}
                    </p>
                  </div>

                  {/* Read Article Trigger */}
                  <div className="flex items-center gap-1 text-xs font-semibold text-black uppercase tracking-wider mt-4 group-hover:opacity-70 transition-opacity">
                    <span>Read Article</span>
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                      ↗
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </main>
  );
};