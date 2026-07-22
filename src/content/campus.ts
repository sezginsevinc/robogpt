import type { L10n } from "./locale";

export interface Building {
  id: string;
  name: L10n;
  reveal: L10n;
  /** Grid position and footprint in the miniature campus scene. */
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
}

export const buildings: Building[] = [
  {
    id: "robotik",
    name: { tr: "Robotik Atölyesi", en: "Robotics Lab" },
    reveal: {
      tr: "Altı çalışma masası, bir test pisti. Duvarda: emekli olmuş ilk robotlar.",
      en: "Six workbenches, one test track. On the wall: the first robots, now retired.",
    },
    x: -2.4, z: -1.2, w: 1.6, d: 1.2, h: 1.0,
  },
  {
    id: "fen",
    name: { tr: "Bilim Laboratuvarı", en: "Science Lab" },
    reveal: {
      tr: "Çeker ocak, mikroskop sırası ve tavana asılı bir sarkaç.",
      en: "A fume hood, a row of microscopes, and a pendulum hanging from the ceiling.",
    },
    x: -0.4, z: -1.6, w: 1.3, d: 1.0, h: 1.35,
  },
  {
    id: "matematik",
    name: { tr: "Matematik Stüdyosu", en: "Mathematics Studio" },
    reveal: {
      tr: "Yazılabilir duvarlar. Silgi kullanmak serbest, korkmak yasak.",
      en: "Writable walls. Erasers allowed, fear forbidden.",
    },
    x: 1.5, z: -1.1, w: 1.1, d: 1.1, h: 0.8,
  },
  {
    id: "strateji",
    name: { tr: "Strateji Salonu", en: "Strategy Hall" },
    reveal: {
      tr: "Satranç, go ve mekanik bulmacalar. En sessiz ve en yoğun oda.",
      en: "Chess, go and mechanical puzzles. The quietest, most intense room.",
    },
    x: -2.2, z: 0.7, w: 1.2, d: 1.4, h: 0.7,
  },
  {
    id: "uretim",
    name: { tr: "Üretim Atölyesi", en: "Fabrication Shop" },
    reveal: {
      tr: "Üç boyutlu yazıcılar gece de çalışır. Sabah ilk gelen, çıktıları toplar.",
      en: "The 3D printers run overnight. Whoever arrives first collects the prints.",
    },
    x: 0.1, z: 0.9, w: 1.7, d: 1.2, h: 1.15,
  },
  {
    id: "sahne",
    name: { tr: "Gösteri Sahnesi", en: "Demo Stage" },
    reveal: {
      tr: "Her dönemin sonunda projeler burada seyirciyle buluşur. Alkış gerçektir.",
      en: "At the end of every term, projects meet their audience here. The applause is real.",
    },
    x: 2.2, z: 0.6, w: 1.4, d: 1.0, h: 0.55,
  },
  {
    id: "kutuphane",
    name: { tr: "Fikir Kütüphanesi", en: "Idea Library" },
    reveal: {
      tr: "Kitaplar, devre şemaları ve yarım kalmış fikirlerin not defterleri.",
      en: "Books, circuit diagrams, and the notebooks of ideas not finished yet.",
    },
    x: 3.0, z: -0.9, w: 0.9, d: 1.3, h: 1.5,
  },
];
