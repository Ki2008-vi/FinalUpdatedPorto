import React, { useState, useRef, useEffect } from "react";
import { ScrollReveal } from "../ui/ScrollReveal";
import { ChevronDown, Check, Filter } from "lucide-react";

interface SkillItem {
  id: string;
  name: string;
  tags: string[];
}

interface SkillGroup {
  groupId: string;
  groupLabel: string;
  skills: SkillItem[];
}

export const Skills: React.FC = () => {
  const skillGroups: SkillGroup[] = [
    {
      groupId: "languages",
      groupLabel: "Programming Languages",
      skills: [
        {
          id: "lang-01",
          name: "HTML5",
          tags: ["Semantic Markup", "Accessibility", "SEO"],
        },
        {
          id: "lang-02",
          name: "CSS",
          tags: ["Responsive Design", "Animations", "Flexbox & Grid"],
        },
        {
          id: "lang-03",
          name: "JavaScript",
          tags: ["ES6+", "DOM Manipulation", "Async/Await"],
        },
        {
          id: "lang-04",
          name: "TypeScript",
          tags: ["Type Safety", "Interfaces", "Generics"],
        },
        {
          id: "lang-05",
          name: "PHP",
          tags: ["Server-side", "RESTful APIs", "OOP"],
        },
      ],
    },
    {
      groupId: "frameworks",
      groupLabel: "Frameworks & Libraries",
      skills: [
        {
          id: "fw-01",
          name: "React",
          tags: ["Hooks", "Component Design", "State Management"],
        },
        {
          id: "fw-02",
          name: "Next.js",
          tags: ["SSR", "SSG", "App Router"],
        },
        {
          id: "fw-03",
          name: "Vue.js",
          tags: ["Composition API", "Vuex", "Single File Components"],
        },
        {
          id: "fw-04",
          name: "Laravel",
          tags: ["MVC", "Eloquent ORM", "Blade Templates"],
        },
      ],
    },
    {
      groupId: "database",
      groupLabel: "Database",
      skills: [
        {
          id: "db-01",
          name: "SQL",
          tags: ["MySQL", "Query Optimization", "Schema Design"],
        },
      ],
    },
    {
      groupId: "ui_libraries",
      groupLabel: "UI Libraries & Styling",
      skills: [
        {
          id: "ui-01",
          name: "Tailwind CSS",
          tags: ["Utility-first CSS", "Responsive Layouts", "Custom Design Tokens"],
        },
        {
          id: "ui-02",
          name: "Shadcn UI",
          tags: ["Radix Primitives", "Accessible Components", "Customizable UI"],
        },
        {
          id: "ui-03",
          name: "GSAP",
          tags: ["ScrollTrigger", "Timeline Animations", "Hardware Accelerated"],
        },
        {
          id: "ui-04",
          name: "Motion UI (Framer Motion)",
          tags: ["React Animations", "Layout Transitions", "Gesture Controls"],
        },
        {
          id: "ui-05",
          name: "Framer UI",
          tags: ["Interactive Design", "Component Prototyping", "Animation"],
        },
        {
          id: "ui-06",
          name: "Bootstrap",
          tags: ["Responsive Grid", "UI Components", "Utility Classes"],
        },
      ],
    },
  ];

  // Active category filter state ('all' or groupId)
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Track expanded accordions
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    languages: true,
    frameworks: true,
    database: true,
    ui_libraries: true,
  });

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const filteredGroups = selectedCategory === "all"
    ? skillGroups
    : skillGroups.filter((g) => g.groupId === selectedCategory);

  const totalSkillsCount = skillGroups.reduce((acc, g) => acc + g.skills.length, 0);

  const activeGroupObj = skillGroups.find((g) => g.groupId === selectedCategory);
  const activeLabel = selectedCategory === "all"
    ? `All Categories (${totalSkillsCount})`
    : `${activeGroupObj?.groupLabel || selectedCategory} (${activeGroupObj?.skills.length || 0})`;

  return (
    <section
      id="skills-section"
      className="relative w-full py-28 md:py-32 bg-[#f2f1ed] text-[#111111]"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Section Heading & Custom Dropdown Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 select-none gap-6">
          <ScrollReveal y={20} duration={0.6}>
            <h2 className="font-sans font-bold tracking-tight text-5xl sm:text-7xl lg:text-[80px] leading-none">
              Skills
            </h2>
          </ScrollReveal>

          {/* Custom Styled Dropdown Filter */}
          <ScrollReveal y={20} delay={0.1} duration={0.6}>
            <div ref={dropdownRef} className="relative inline-block text-left w-full sm:w-auto">
              <button
                type="button"
                id="skills-category-dropdown-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full sm:w-68 flex items-center justify-between bg-[#f2f1ed] text-black hover:bg-white border border-black/15 hover:border-black/40 rounded-full px-5 py-3 text-sm font-sans font-medium focus:outline-none transition-all duration-300 shadow-sm cursor-pointer group"
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
              >
                <div className="flex items-center gap-2 truncate">
                  <Filter className="w-4 h-4 text-black/60 flex-shrink-0 group-hover:text-black transition-colors" />
                  <span className="truncate">{activeLabel}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-black/70 flex-shrink-0 transition-transform duration-300 ml-2 ${
                    dropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {/* Animated Popup Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-full sm:w-72 rounded-2xl bg-[#f2f1ed] border border-black p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex flex-col gap-1 max-h-64 overflow-y-auto custom-scrollbar">
                    {/* Option: All Categories */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory("all");
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-sans transition-all duration-150 cursor-pointer text-left ${
                        selectedCategory === "all"
                          ? "bg-white/15 text-black font-semibold"
                          : "text-black/80 hover:bg-white/10 hover:text-black"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {selectedCategory === "all" ? (
                          <Check className="w-4 h-4 text-black" />
                        ) : (
                          <span className="w-4" />
                        )}
                        <span>All Categories</span>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#f2f1ed] text-black font-mono">
                        {totalSkillsCount}
                      </span>
                    </button>

                    {/* Option: Individual Skill Groups */}
                    {skillGroups.map((g) => {
                      const isSelected = selectedCategory === g.groupId;
                      return (
                        <button
                          key={g.groupId}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(g.groupId);
                            setExpandedGroups((prev) => ({
                              ...prev,
                              [g.groupId]: true,
                            }));
                            setDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-sans transition-all duration-150 cursor-pointer text-left ${
                            isSelected
                              ? "bg-white/15 text-black font-semibold"
                              : "text-black/80 hover:bg-white/10 hover:text-black"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {isSelected ? (
                              <Check className="w-4 h-4 text-black flex-shrink-0" />
                            ) : (
                              <span className="w-4 flex-shrink-0" />
                            )}
                            <span className="truncate">{g.groupLabel}</span>
                          </div>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[#f2f1ed] text-black font-mono flex-shrink-0 ml-2">
                            {g.skills.length}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* Accordion List Layout */}
        <div className="flex flex-col gap-8">
          {filteredGroups.map((group, groupIndex) => {
            const isExpanded = expandedGroups[group.groupId] ?? true;

            return (
              <div
                key={group.groupId}
                id={`skill-group-${group.groupId}`}
                className="bg-[#f2f1ed] border border-black/10 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-black/20"
              >
                {/* Accordion Group Header */}
                <button
                  onClick={() => toggleGroup(group.groupId)}
                  className="w-full flex items-center justify-between group text-left cursor-pointer focus:outline-none select-none"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3">
                    <p className="font-sans text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-black/50 group-hover:text-black transition-colors">
                      {group.groupLabel}
                    </p>

                    <span className="text-xs font-sans font-medium px-2.5 py-0.5 rounded-full bg-black/5 text-black/60">
                      {group.skills.length}
                    </span>
                  </div>

                  <div className="p-2 rounded-full hover:bg-black/5 transition-colors">
                    <ChevronDown
                      className={`w-5 h-5 text-black/60 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                </button>

                {/* Collapsible Content */}
                <div
                  className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
                    isExpanded
                      ? "grid-rows-[1fr] opacity-100 mt-4 border-t border-black/10 pt-2"
                      : "grid-rows-[0fr] opacity-0 mt-0 pt-0"
                  }`}
                >
                  <div className="overflow-hidden flex flex-col">
                    {group.skills.map((skill) => (
                      <div
                        key={skill.id}
                        id={`skill-row-${skill.id}`}
                        className="group flex flex-col md:flex-row justify-between items-start md:items-center py-5 border-b border-black/5 last:border-b-0 hover:border-black/20 transition-colors duration-300"
                      >
                        {/* Left: Name */}
                        <h3 className="font-sans font-medium text-xl md:text-2xl text-black mb-2 md:mb-0">
                          {skill.name}
                        </h3>

                        {/* Right: Dot-Separated Tags */}
                        <div className="flex flex-wrap items-center font-sans text-xs md:text-sm text-black/50">
                          {skill.tags.map((tag, tagIndex) => (
                            <React.Fragment key={tag}>
                              <span className="tracking-wide">{tag}</span>
                              {tagIndex < skill.tags.length - 1 && (
                                <span className="mx-2.5 text-black/30 md:mx-3">•</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
