import React, { useEffect } from "react";
import { BlogPost } from "../../types";
import { blogs } from "../../data/blog";
import { ScrollReveal } from "../ui/ScrollReveal";
import Markdown from "react-markdown";
import frontImgSrc from "../../assets/images/guwe.jpg";

interface BlogDetailPageProps {
  post: BlogPost;
  setRoute: (route: string) => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({
  post,
  setRoute,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as any });
  }, [post]);

  // Find 2 other related articles
  const related = blogs.filter((b) => b.slug !== post.slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-[#F4F3EF] text-[#111111] pt-32 pb-24 font-sans">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Back Button */}
        <div className="mb-12">
          <button
            onClick={() => setRoute("/blog")}
            className="group inline-flex items-center gap-2 text-sm font-medium text-black/60 hover:text-black transition-colors cursor-pointer"
          >
            ← Back to thoughts
          </button>
        </div>

        {/* Article Hero */}
        <ScrollReveal y={20} duration={0.8} className="mb-12 select-none">
          <div className="flex items-center gap-2 text-sm text-black/60 font-medium mb-4">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl text-black leading-tight tracking-tight mb-6">
            {post.title}
          </h1>

          <p className="font-sans text-lg sm:text-xl text-black/60 max-w-[720px] leading-relaxed mb-8 font-medium">
            {post.subtitle}
          </p>

          <div className="flex items-center gap-7 border-y border-black/10 py-6">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-black/5">
              <img
                src={frontImgSrc}
                alt="Riski Portrait Face"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold text-black">Riski</span>
              <span className="text-xs text-black/50 font-medium">Software Engineer / Creator</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Main Article Image Banner */}
        <ScrollReveal y={25} duration={0.9} className="mb-16 rounded-[24px] overflow-hidden bg-black/5">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[350px] md:h-[500px] object-cover"
            referrerPolicy="no-referrer"
          />
        </ScrollReveal>

        {/* Markdown Content Container */}
        <ScrollReveal y={25} duration={0.8} once={true} className="mb-24">
          <div className="max-w-[720px] mx-auto text-left font-sans text-lg leading-relaxed text-black/80 prose prose-neutral">
            <Markdown>{post.content}</Markdown>
          </div>
        </ScrollReveal>

        {/* Related Articles Section */}
        <div className="border-t border-black/10 pt-16 mt-16 text-left">
          <h3 className="font-sans font-bold text-2xl text-black tracking-tight mb-8">
            Related Articles
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((article) => (
              <div
                key={article.slug}
                onClick={() => setRoute(`/blog/${article.slug}`)}
                className="group cursor-pointer bg-white rounded-[24px] p-8 transition-all flex flex-col justify-between border border-black/5 shadow-sm hover:border-black/10 h-full"
              >
                <div>
                  <span className="text-xs font-medium text-black/50 block mb-2">
                    {article.date}
                  </span>
                  <h4 className="font-sans font-bold text-xl text-black tracking-tight mb-2 group-hover:opacity-80 transition-opacity">
                    {article.title}
                  </h4>
                  <p className="font-sans text-sm text-black/60 leading-relaxed line-clamp-2 font-medium">
                    {article.subtitle}
                  </p>
                </div>
                
                <div className="flex items-center gap-1 text-xs font-semibold text-black uppercase tracking-wider mt-8 group-hover:opacity-70">
                  <span>Read Article</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
};