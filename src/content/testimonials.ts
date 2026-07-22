import type { L10n } from "./locale";

export interface Testimonial {
  quote: L10n;
  name: string;
  relation: L10n;
  /** Depth position in the Chapter 7 field, 0 = nearest. */
  depth: number;
}

export const testimonials: Testimonial[] = [
  {
    quote: {
      tr: "İlk ay boyunca eve her dönüşünde bize bir şey öğretti. Derse gitmiyor; atölyesine gidiyor.",
      en: "That first month, he came home teaching us something every single day. He doesn't go to class — he goes to his workshop.",
    },
    name: "Elif K.",
    relation: { tr: "Deniz'in (9) annesi", en: "Mother of Deniz, 9" },
    depth: 0,
  },
  {
    quote: {
      tr: "Kızım \"yanlış yaptım\" demeyi bıraktı, \"bu ilk denememdi\" demeye başladı.",
      en: "My daughter stopped saying \"I got it wrong\" and started saying \"that was my first attempt.\"",
    },
    name: "Murat A.",
    relation: { tr: "Zeynep'in (11) babası", en: "Father of Zeynep, 11" },
    depth: 1,
  },
  {
    quote: {
      tr: "Bizi ikna eden, oyunun altındaki ciddiyet oldu: oyun gibi görünüyor, mühendislik gibi işliyor.",
      en: "What convinced us was the seriousness underneath: it looks like play, it runs like engineering.",
    },
    name: "Seda T.",
    relation: { tr: "Aras'ın (10) annesi", en: "Mother of Aras, 10" },
    depth: 2,
  },
];
