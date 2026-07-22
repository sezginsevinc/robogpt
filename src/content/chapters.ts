import type { L10n } from "./locale";

export const chapters = {
  curiosity: {
    label: { tr: "Merak", en: "Curiosity" } satisfies L10n,
    intro: {
      tr: "Karanlık, cevap vermeden önce soru sorar.",
      en: "The dark asks questions before it answers.",
    } satisfies L10n,
    questions: [
      { tr: "Neden uçar?", en: "Why does it fly?" },
      { tr: "İçinde ne var?", en: "What's inside?" },
      { tr: "Ya tersini denersek?", en: "What if we tried it backwards?" },
      { tr: "Bunu ben yapabilir miyim?", en: "Could I build this?" },
    ] satisfies L10n[],
  },
  discovery: {
    label: { tr: "Keşif", en: "Discovery" } satisfies L10n,
    heading: {
      tr: "Merak, yapıya dönüşür.",
      en: "Curiosity becomes structure.",
    } satisfies L10n,
    blocks: [
      {
        tr: "Uyandırdığın kıvılcımlar örgütleniyor.",
        en: "The sparks you woke are organizing.",
      },
      {
        tr: "Devreler kendini çiziyor. Dişliler birbirini buluyor.",
        en: "Circuits trace themselves. Gears find each other.",
      },
      {
        tr: "Öğrenmek tam olarak budur: dağınıklığın anlam kazanması.",
        en: "This is what learning is: chaos gaining meaning.",
      },
    ] satisfies L10n[],
  },
  creation: {
    label: { tr: "Yaratım", en: "Creation" } satisfies L10n,
    heading: {
      tr: "Burada yapılanlar vitrinlik değil. Çalışır.",
      en: "What's built here isn't for display. It runs.",
    } satisfies L10n,
    hint: {
      tr: "Kaydırarak ilerle · İncelemek için üzerine gel · Girmek için dokun",
      en: "Scroll to drift · Hover to see inside · Tap to enter",
    } satisfies L10n,
  },
  disciplines: {
    label: { tr: "Disiplinler", en: "Disciplines" } satisfies L10n,
    heading: {
      tr: "Beş disiplin. Beş ayrı fizik.",
      en: "Five disciplines. Five kinds of physics.",
    } satisfies L10n,
  },
  journey: {
    label: { tr: "Yolculuk", en: "Journey" } satisfies L10n,
    heading: {
      tr: "Öğrenme bir çizelge değil, bir dönüşümdür.",
      en: "Learning isn't a timeline. It's a transformation.",
    } satisfies L10n,
    stages: [
      { tr: "Merak", en: "Curiosity" },
      { tr: "Deney", en: "Experiment" },
      { tr: "Hata", en: "Failure" },
      { tr: "Yineleme", en: "Iteration" },
      { tr: "Özgüven", en: "Confidence" },
      { tr: "Yaratım", en: "Creation" },
      { tr: "Başarı", en: "Achievement" },
    ] satisfies L10n[],
    failureNote: {
      tr: "Parçalar dağılır. Burada buna veri denir.",
      en: "The pieces scatter. Here, we call that data.",
    } satisfies L10n,
  },
  proof: {
    label: { tr: "Kanıt", en: "Proof" } satisfies L10n,
    heading: {
      tr: "Sayılar burada sayılmaz. Kazanılır.",
      en: "Numbers aren't counted here. They're earned.",
    } satisfies L10n,
  },
  trust: {
    label: { tr: "Güven", en: "Trust" } satisfies L10n,
    heading: {
      tr: "Bize sormayın. Onlara sorun.",
      en: "Don't ask us. Ask them.",
    } satisfies L10n,
  },
  campus: {
    label: { tr: "Kampüs", en: "Campus" } satisfies L10n,
    heading: {
      tr: "Kampüs, keşfedildikçe aydınlanır.",
      en: "The campus lights up as you explore it.",
    } satisfies L10n,
    hint: {
      tr: "İşaretçiyi gezdir · Binalara dokun",
      en: "Move your pointer · Tap the buildings",
    } satisfies L10n,
  },
  epilogue: {
    label: { tr: "Dönüş", en: "Return" } satisfies L10n,
    line1: {
      tr: "Gördüğün her şey, en başından beri çekirdeğin içindeydi.",
      en: "Everything you saw was inside the core all along.",
    } satisfies L10n,
    line2: {
      tr: "Her şey bir kıvılcımla başladı. Sıradaki kıvılcım senin.",
      en: "It started with a spark. Yours is next.",
    } satisfies L10n,
  },
} as const;
