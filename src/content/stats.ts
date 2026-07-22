import type { L10n } from "./locale";

/** Sample figures — replace with audited campus numbers before launch. */
export const headlineStat = {
  value: "500+",
  label: { tr: "genç mucit", en: "young inventors" } satisfies L10n,
};

export const stats: { value: string; label: L10n }[] = [
  {
    value: "1.200+",
    label: { tr: "tamamlanan proje", en: "projects completed" },
  },
  {
    value: "38",
    label: { tr: "ulusal ve uluslararası ödül", en: "national & international awards" },
  },
  {
    value: "%94",
    label: { tr: "yeniden kayıt oranı", en: "re-enrollment rate" },
  },
];

export const statsFootnote: L10n = {
  tr: "Kampüs kayıtları, 2021–2026",
  en: "Campus records, 2021–2026",
};
