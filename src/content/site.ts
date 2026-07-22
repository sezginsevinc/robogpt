import type { L10n } from "./locale";

export const site = {
  name: "ROBOKAMPÜS",
  codename: "KIVILCIM",
  url: "https://robokampus.com",
  tagline: {
    tr: "Çocuklar için inovasyon kampüsü",
    en: "An innovation campus for children",
  } satisfies L10n,
  description: {
    tr: "ROBOKAMPÜS, çocukların merakını mühendislik düşüncesine dönüştüren bir inovasyon kampüsüdür. Robotik, bilim, matematik, STEM, zekâ oyunları ve teknoloji atölyeleri.",
    en: "ROBOKAMPÜS is an innovation campus that turns children's curiosity into engineering minds. Robotics, science, mathematics, STEM, logic games and technology workshops.",
  } satisfies L10n,
  headline: {
    tr: "Geleceği öğretmiyoruz.\nOnu kuracak zihinleri inşa ediyoruz.",
    en: "We don't teach the future.\nWe build the minds that will.",
  } satisfies L10n,
  subline: {
    tr: "Çocuklar için bir inovasyon kampüsü. Merakla çalışır.",
    en: "An innovation campus for children. Powered by curiosity.",
  } satisfies L10n,
  cta: {
    explore: { tr: "Kampüsü Keşfet", en: "Explore the Campus" } satisfies L10n,
    visit: { tr: "Ziyaret Planla", en: "Book a Visit" } satisfies L10n,
    scroll: { tr: "Keşfetmek için kaydır", en: "Scroll to discover" } satisfies L10n,
  },
  nav: {
    experience: { tr: "Deneyim", en: "Experience" } satisfies L10n,
    programs: { tr: "Programlar", en: "Programs" } satisfies L10n,
    projects: { tr: "Projeler", en: "Projects" } satisfies L10n,
    manifesto: { tr: "Manifesto", en: "Manifesto" } satisfies L10n,
    visit: { tr: "Ziyaret", en: "Visit" } satisfies L10n,
  },
  core: {
    dormant: { tr: "UYKUDA", en: "DORMANT" } satisfies L10n,
    waking: { tr: "UYANIYOR", en: "WAKING" } satisfies L10n,
    awake: { tr: "UYANIK", en: "AWAKE" } satisfies L10n,
  },
  footerLine: {
    tr: "ROBOKAMPÜS · Çocuklar için inovasyon kampüsü · Kod adı KIVILCIM",
    en: "ROBOKAMPÜS · An innovation campus for children · Codename KIVILCIM",
  } satisfies L10n,
} as const;
