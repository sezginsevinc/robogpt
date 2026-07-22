import type { L10n } from "./locale";

export interface Program {
  slug: string;
  name: L10n;
  tagline: L10n;
  description: L10n;
  ages: string;
  format: L10n;
  /** Which physical language its Chapter 4 room speaks. */
  room: "robotics" | "science" | "mathematics" | "logic" | "technology";
}

export const programs: Program[] = [
  {
    slug: "robotik-kodlama",
    name: { tr: "Robotik & Kodlama", en: "Robotics & Coding" },
    tagline: {
      tr: "Düşünen makineler, kuran çocuklar.",
      en: "Thinking machines, built by children.",
    },
    description: {
      tr: "Sensörden servoya, koddan mekanizmaya: çocuklar kendi robotlarını tasarlar, kurar ve programlar. Her dönem, çalışır durumda bir makineyle biter — kutudan çıkma bir kitle değil, kendi kararlarının toplamıyla.",
      en: "From sensor to servo, from code to mechanism: children design, build and program their own robots. Every term ends with a working machine — not a kit from a box, but the sum of their own decisions.",
    },
    ages: "7–14",
    format: { tr: "Haftalık atölye · 12 hafta", en: "Weekly workshop · 12 weeks" },
    room: "robotics",
  },
  {
    slug: "bilim-atolyeleri",
    name: { tr: "Bilim Atölyeleri", en: "Science Workshops" },
    tagline: {
      tr: "Sorulara elle dokunulur.",
      en: "Questions you can touch.",
    },
    description: {
      tr: "Kimya köpürür, fizik düşer, biyoloji büyür. Deneyler gösteri değildir; her çocuk hipotezini kurar, düzeneğini kendisi hazırlar ve sonuçla yüzleşir. Yanlış çıkan tahmin, en değerli veridir.",
      en: "Chemistry fizzes, physics falls, biology grows. Experiments are not demonstrations; every child states a hypothesis, builds the setup and faces the result. A wrong prediction is the most valuable data point.",
    },
    ages: "6–13",
    format: { tr: "Haftalık atölye · 10 hafta", en: "Weekly workshop · 10 weeks" },
    room: "science",
  },
  {
    slug: "matematik",
    name: { tr: "Matematik", en: "Mathematics" },
    tagline: {
      tr: "Yaşayan geometri, oynayan sayılar.",
      en: "Living geometry, numbers at play.",
    },
    description: {
      tr: "Formül ezberi yok. Desenler keşfedilir, eğriler çizilir, uzay katlanır. Matematik burada bir dil olarak öğrenilir — dünyayı tarif etmenin en kesin dili.",
      en: "No memorized formulas. Patterns are discovered, curves are drawn, space is folded. Mathematics is learned here as a language — the most precise language for describing the world.",
    },
    ages: "7–14",
    format: { tr: "Haftalık stüdyo · 12 hafta", en: "Weekly studio · 12 weeks" },
    room: "mathematics",
  },
  {
    slug: "stem",
    name: { tr: "STEM Eğitimi", en: "STEM Education" },
    tagline: {
      tr: "Dört disiplin, tek zihin.",
      en: "Four disciplines, one mind.",
    },
    description: {
      tr: "Gerçek problemler disiplin sınırı tanımaz. STEM programında çocuklar bilimi, teknolojiyi, mühendisliği ve matematiği aynı projenin içinde kullanır: bir sera otomasyonu, bir köprü, bir hava istasyonu.",
      en: "Real problems don't respect subject boundaries. In the STEM program children use science, technology, engineering and mathematics inside the same project: a greenhouse automation, a bridge, a weather station.",
    },
    ages: "8–14",
    format: { tr: "Proje dönemi · 14 hafta", en: "Project term · 14 weeks" },
    room: "technology",
  },
  {
    slug: "zeka-mantik-oyunlari",
    name: { tr: "Zekâ & Mantık Oyunları", en: "Intelligence & Logic Games" },
    tagline: {
      tr: "Her hamle, bir düşünce provasıdır.",
      en: "Every move rehearses a thought.",
    },
    description: {
      tr: "Strateji oyunları, mekanik bulmacalar, algoritmik düşünme. Kaybetmek oyunun içindedir; plan kurmak, planı bozulunca yeniden kurmak da. Sabır ve öngörü burada kas gibi çalıştırılır.",
      en: "Strategy games, mechanical puzzles, algorithmic thinking. Losing is part of the game; so is making a plan, and remaking it when it breaks. Patience and foresight are trained here like muscles.",
    },
    ages: "6–12",
    format: { tr: "Haftalık salon · Sürekli", en: "Weekly hall · Ongoing" },
    room: "logic",
  },
  {
    slug: "teknoloji-atolyeleri",
    name: { tr: "Teknoloji Atölyeleri", en: "Technology Workshops" },
    tagline: {
      tr: "Yarının aletleri, bugünün ellerinde.",
      en: "Tomorrow's tools, in today's hands.",
    },
    description: {
      tr: "3B tasarım ve baskı, elektronik, temel yapay zekâ. Çocuklar teknolojiyi tüketen değil, kuran tarafta durur: fikirden prototipe giden yolun her adımını kendi elleriyle yürür.",
      en: "3D design and printing, electronics, foundational AI. Children stand on the building side of technology, not the consuming side: they walk every step from idea to prototype with their own hands.",
    },
    ages: "9–14",
    format: { tr: "Haftalık atölye · 12 hafta", en: "Weekly workshop · 12 weeks" },
    room: "technology",
  },
];

export function getProgram(slug: string) {
  return programs.find((p) => p.slug === slug);
}
