export interface EducationItem {
  id: string;
  type: "education" | "certificate";
  title: {
    EN: string;
    ID: string;
  };
  institution: string;
  period: string;
  badge?: string;
  grade?: string;
  description: {
    EN: string;
    ID: string;
  };
  skills?: string[];
}

export const educationAndCertificates: EducationItem[] = [
  {
    id: "edu-1",
    type: "education",
    title: {
      EN: "Software Engineering Diploma",
      ID: "Rekayasa Perangkat Lunak (Diploma)"
    },
    institution: "SMK PGRI 2 Ponorogo",
    period: "2023 - 2026",
    badge: "Vocational Education",
    description: {
      EN: "Focused on full-stack web development with Next.js, Vue.js, Laravel, and MySQL database management. Built responsive interfaces and RESTful backend architectures.",
      ID: "Berfokus pada pengembangan web full-stack menggunakan Next.js, Vue.js, Laravel, serta pengelolaan database MySQL. Membangun antarmuka responsif dan arsitektur backend RESTful."
    },
    skills: ["Next.js", "Vue.js", "Laravel", "MySQL", "TypeScript", "Tailwind CSS"]
  },
  {
    id: "edu-2",
    type: "education",
    title: {
      EN: "Web Development Internship",
      ID: "Praktik Kerja Lapangan (Magang) Web Development"
    },
    institution: "Degeweb (CV. Mitra Digital Nusantara)",
    period: "Aug 2024 - Mar 2025",
    badge: "Professional Internship",
    grade: "Performance: Very Good (Sangat Baik)",
    description: {
      EN: "Completed an intensive 8-month web development internship. Built & customized responsive websites, WordPress themes, custom PHP & JS components.",
      ID: "Menyelesaikan program magang (PKL) web development selama 8 bulan. Membangun & mengkustomisasi situs web responsif, tema WordPress, serta komponen PHP & JS kustom."
    },
    skills: ["PHP", "JavaScript", "WordPress", "Web Performance", "MySQL"]
  },
  {
    id: "cert-2",
    type: "certificate",
    title: {
      EN: "AI Ignition Training Certificate",
      ID: "Sertifikat Pelatihan AI Ignition"
    },
    institution: "AMMAN x KUMPUL (Supported by Google & ADB)",
    period: "May 2025",
    badge: "AI & Innovation",
    grade: "Google & ADB Supported",
    description: {
      EN: "Completed AI Ignition Program implemented as part of AVPN AI Opportunity Fund, focusing on AI tools integration and modern application workflows.",
      ID: "Menyelesaikan Program AI Ignition sebagai bagian dari AVPN AI Opportunity Fund, berfokus pada integrasi alat AI dan alur kerja aplikasi modern."
    },
    skills: ["AI Integration", "Prompt Engineering", "Modern Web Workflows"]
  },
  {
    id: "cert-3",
    type: "certificate",
    title: {
      EN: "Front-End Web Development Specialization",
      ID: "Spesialisasi Front-End Web Development"
    },
    institution: "Professional Web Certification",
    period: "2024 - 2025",
    badge: "Certified Developer",
    grade: "Mastery Level",
    description: {
      EN: "Demonstrated advanced proficiency in building high-performance, responsive React & Next.js applications, modern state management, and smooth GSAP animation systems.",
      ID: "Membuktikan kemahiran tingkat lanjut dalam membangun aplikasi React & Next.js yang responsif dan berkinerja tinggi, manajemen state modern, serta sistem animasi GSAP."
    },
    skills: ["React", "Next.js", "GSAP", "UI/UX Architecture"]
  },
  {
    id: "cert-4",
    type: "certificate",
    title: {
      EN: "Competency Certificate — Software Engineering Skills",
      ID: "Sertifikat Uji Kompetensi — Keahlian Rekayasa Perangkat Lunak"
    },
    institution: "AGIT (Astra Graphia Information Technology), a member of Astra",
    period: "May 2026",
    badge: "Competency Assessment",
    grade: "SATU Indonesia Collaboration",
    description: {
      EN: "Awarded a Competency Certificate by AGIT (Astra Graphia Information Technology), a member of Astra, in collaboration with SATU Indonesia, after passing the competency assessment for Software Engineering (Rekayasa Perangkat Lunak) at SMK PGRI 2 Ponorogo. Certified in Jakarta on May 5, 2026, and signed by Satryo Dewandono, Chief of Business Strategy & Development and Corporate Communications, PT Astra Graphia Tbk.",
      ID: "Dianugerahi Sertifikat Uji Kompetensi oleh AGIT (Astra Graphia Information Technology), bagian dari Astra, berkolaborasi dengan SATU Indonesia, setelah lulus uji kompetensi Rekayasa Perangkat Lunak di SMK PGRI 2 Ponorogo. Ditetapkan di Jakarta pada 5 Mei 2026 dan ditandatangani oleh Satryo Dewandono, Chief of Business Strategy & Development and Corporate Communications PT Astra Graphia Tbk."
    },
    skills: ["Software Engineering", "System Assessment", "Competency Certification"]
  }
];
