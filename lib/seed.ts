import { packages, services, faqs, contact, socialLinks, brand } from "./site-data";

export const seedProjects = [
  {
    slug: "serev-tedarik",
    title: "Serev Tedarik",
    category: "B2B E-Ticaret Platformu",
    year: "2026",
    description: "B2B tedarik süreçlerini hızlandıran modern e-ticaret platformu.",
    gradient: "from-[#ff4fa3] via-[#a855f7] to-[#ffb02e]",
    initial: "S",
    accent: "text-pink",
    sort_order: 1,
  },
  {
    slug: "serap-ercan",
    title: "Serap Ercan",
    category: "Premium E-Ticaret Deneyimi",
    year: "2026",
    description: "Premium ürünleri öne çıkaran zarif e-ticaret deneyimi.",
    gradient: "from-[#8f4cf8] via-[#ff4fa3] to-[#ff7a1a]",
    initial: "SE",
    accent: "text-amber",
    sort_order: 2,
  },
  {
    slug: "mono-mobilya",
    title: "Mono Mobilya",
    category: "Marka Kimliği & Web Sitesi",
    year: "2025",
    description: "Sade mobilya markası için kimlik ve web sitesi.",
    gradient: "from-[#ff7a1a] via-[#ff2f9b] to-[#be55ff]",
    initial: "M",
    accent: "text-orange",
    sort_order: 3,
  },
  {
    slug: "ritim-festivali",
    title: "Ritim Festivali",
    category: "Etkinlik & Dijital Deneyim",
    year: "2025",
    description: "Festival için etkinlik kimliği ve dijital deneyim.",
    gradient: "from-[#ff2f9b] via-[#46cfff] to-[#ffeb70]",
    initial: "R",
    accent: "text-violet",
    sort_order: 4,
  },
];

export const seedPackages = packages.map((p, i) => ({
  title: p.title,
  eyebrow: p.eyebrow,
  description: p.desc,
  points: p.points,
  sort_order: i + 1,
}));

export const seedServices = services.map((s, i) => ({
  no: s.no,
  title: s.title,
  description: s.desc,
  dot: s.dot,
  sort_order: i + 1,
}));

export const seedFaqs = faqs.map((f, i) => ({
  question: f.question,
  answer: f.answer,
  sort_order: i + 1,
}));

export const seedSettings: Record<string, unknown> = {
  contact,
  socialLinks,
  brand,
  hero: {
    smallBold:
      "Web tasarım, e-ticaret ve marka deneyimiyle dijitalde hatırlanan yüzler.",
    sideCopy:
      "Hızlı düşünen, renkli ve performans odaklı yaratıcı dijital stüdyo.",
  },
  stats: [
    { to: 50, suffix: "+", label: "Tamamlanan Proje" },
    { to: 98, prefix: "%", label: "Müşteri Memnuniyeti" },
    { to: 6, suffix: "+", label: "Yıllık Deneyim" },
    { to: 24, suffix: "s", label: "İçinde Yanıt" },
  ],
};
