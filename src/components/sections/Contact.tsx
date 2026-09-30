import React, { useState, useEffect, useRef } from "react";
import { SplitText } from "../ui/SplitText";
import { ScrollReveal } from "../ui/ScrollReveal";
import { Instagram, Linkedin, CheckCircle2 } from "lucide-react";
import { useLang } from "../../context/LanguageContext";

export const Contact: React.FC = () => {
  const [inView, setInView] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", project: "" });
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { lang } = useLang();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", project: "" });
    }, 4000);
  };

  const socialLinks = [
    { 
      name: "X", 
      url: "https://x.com/Rysehz0", 
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ) 
    },
    { name: "Instagram", url: "https://instagram.com/ryswpsite", icon: <Instagram size={16} /> },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/ganes-riski-pratama-2b380840b/", icon: <Linkedin size={16} /> },
  ];

  const t = {
    heading: lang === "ID" ? "Mari bicara." : "Let's talk.",
    subtitle: lang === "ID"
      ? "Punya proyek atau butuh bantuan? Isi formulir di bawah, dan kami akan segera menghubungi kamu."
      : "Have a project or need help? Fill out the form, and we'll get back to you soon.",
    sentTitle: lang === "ID" ? "Pesan Terkirim" : "Message Sent",
    sentDesc: lang === "ID"
      ? "Terima kasih, pesan kamu telah diterima. Kami akan segera menghubungi kamu."
      : "Thank you, your submission has been received. We'll be in touch shortly.",
    nameLabel: lang === "ID" ? "Nama" : "Name",
    namePlaceholder: lang === "ID" ? "Masukkan nama kamu" : "Enter your name",
    emailLabel: lang === "ID" ? "Email" : "Email",
    emailPlaceholder: lang === "ID" ? "Masukkan email kamu" : "Enter your email",
    projectLabel: lang === "ID" ? "Proyek Kamu" : "Your Project",
    projectPlaceholder: lang === "ID" ? "Ceritakan tentang proyekmu" : "Tell us about your project",
    submitBtn: lang === "ID" ? "Kirim" : "Submit",
  };

  return (
    <section
      ref={sectionRef}
      id="contact-section"
      className="relative w-full py-32 bg-[#F4F3EF] text-[#111111]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side Info */}
          <div className="lg:col-span-6 flex flex-col justify-between select-none text-left min-h-[380px] lg:min-h-[460px]">
            <div>
              <h2 className="font-sans font-bold text-6xl sm:text-7xl lg:text-[80px] tracking-tight text-black leading-none mb-4">
                <SplitText text={t.heading} trigger={inView} duration={0.9} delay={0.1} />
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#111111]/80 max-w-[460px] font-medium leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-3 mt-12 lg:mt-0">
              {socialLinks.map((elem) => (
                <a
                  key={elem.name}
                  href={elem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/70 transition-colors"
                >
                  {elem.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side Dark Card Form */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-[#111111] rounded-[24px] p-6 sm:p-10 w-full text-white shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center gap-4 py-20">
                  <CheckCircle2 size={44} className="text-white opacity-90" />
                  <h4 className="font-sans font-bold text-xl tracking-tight">
                    {t.sentTitle}
                  </h4>
                  <p className="font-sans text-sm text-white/60 max-w-[280px]">
                    {t.sentDesc}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full text-left">
                  
                  {/* Name field */}
                  <ScrollReveal y={15} delay={0.1} duration={0.6} once={true}>
                    <div className="flex flex-col w-full gap-2">
                      <label className="font-sans text-sm font-medium text-white/90">
                        {t.nameLabel}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t.namePlaceholder}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:border-white/20 outline-none transition-colors font-sans text-base"
                        required
                      />
                    </div>
                  </ScrollReveal>

                  {/* Email field */}
                  <ScrollReveal y={15} delay={0.2} duration={0.6} once={true}>
                    <div className="flex flex-col w-full gap-2">
                      <label className="font-sans text-sm font-medium text-white/90">
                        {t.emailLabel}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.emailPlaceholder}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:border-white/20 outline-none transition-colors font-sans text-base"
                        required
                      />
                    </div>
                  </ScrollReveal>

                  {/* Message field */}
                  <ScrollReveal y={15} delay={0.3} duration={0.6} once={true}>
                    <div className="flex flex-col w-full gap-2">
                      <label className="font-sans text-sm font-medium text-white/90">
                        {t.projectLabel}
                      </label>
                      <textarea
                        name="project"
                        value={formData.project}
                        onChange={handleChange}
                        placeholder={t.projectPlaceholder}
                        rows={4}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:border-white/20 outline-none transition-colors font-sans text-base resize-none"
                        required
                      />
                    </div>
                  </ScrollReveal>

                  {/* Submit Trigger */}
                  <ScrollReveal y={10} delay={0.4} duration={0.6} once={true} className="mt-2">
                    <button
                      type="submit"
                      className="w-full bg-white text-black py-4 px-6 rounded-xl font-sans font-semibold text-base hover:opacity-90 cursor-pointer transition-opacity"
                    >
                      {t.submitBtn}
                    </button>
                  </ScrollReveal>

                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};