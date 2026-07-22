import type { L10n } from "./locale";

export interface Project {
  slug: string;
  name: L10n;
  builder: L10n;
  year: string;
  discipline: L10n;
  story: L10n;
  mechanics: L10n[];
}

/** Chapter 3 artifacts. Sample content — replace with real campus projects before launch. */
export const projects: Project[] = [
  {
    slug: "cizgi-izleyen-gezgin",
    name: { tr: "Çizgi İzleyen Gezgin", en: "The Line-Trace Rover" },
    builder: { tr: "Deniz, 9 yaşında", en: "Deniz, age 9" },
    year: "2025",
    discipline: { tr: "Robotik & Kodlama", en: "Robotics & Coding" },
    story: {
      tr: "Deniz'in sorusu basitti: \"Araba çizgiyi nasıl görür?\" On iki haftada cevabı kendi elleriyle kurdu. Gezgin, zemindeki çizgiyi kızılötesi gözleriyle izliyor; keskin virajlarda yavaşlamayı Deniz'in yazdığı kod söylüyor.",
      en: "Deniz's question was simple: \"How does a car see the line?\" Over twelve weeks he built the answer with his own hands. The rover follows a floor line with infrared eyes; the code Deniz wrote tells it to slow down in sharp corners.",
    },
    mechanics: [
      { tr: "5'li kızılötesi sensör dizisi — zemini saniyede 100 kez okur", en: "5-unit infrared sensor array — reads the floor 100 times a second" },
      { tr: "Oransal düzeltme algoritması — sapmayı yumuşakça toparlar", en: "Proportional correction algorithm — recovers drift smoothly" },
      { tr: "3B baskı şasi — üç sürümde hafifletildi", en: "3D-printed chassis — lightened across three revisions" },
    ],
  },
  {
    slug: "dikey-bahce-istasyonu",
    name: { tr: "Dikey Bahçe İstasyonu", en: "The Vertical Garden Station" },
    builder: { tr: "Zeynep, 11 yaşında", en: "Zeynep, age 11" },
    year: "2025",
    discipline: { tr: "Bilim + STEM", en: "Science + STEM" },
    story: {
      tr: "Zeynep, fesleğenlerin neden hep onun tatil haftasında kuruduğunu merak etti. İstasyonu artık toprağın nemini kendisi ölçüyor, gerektiğinde suyu kendisi veriyor ve her sulamayı bir günlüğe işliyor. Fesleğenler iyi durumda.",
      en: "Zeynep wondered why the basil always died during her holiday week. Her station now measures soil moisture itself, waters when needed, and logs every watering event. The basil is doing fine.",
    },
    mechanics: [
      { tr: "Toprak nem sensörü + mini pompa devresi", en: "Soil moisture sensor + mini pump circuit" },
      { tr: "Işık ve sıcaklık günlüğü — haftalık grafik çıktısı", en: "Light and temperature log — weekly chart output" },
      { tr: "Damla sulamayı dengeleyen yerçekimi haznesi", en: "Gravity reservoir balancing the drip feed" },
    ],
  },
  {
    slug: "cizim-makinesi",
    name: { tr: "Çizim Makinesi", en: "The Drawing Machine" },
    builder: { tr: "Aras, 10 yaşında", en: "Aras, age 10" },
    year: "2026",
    discipline: { tr: "Matematik + Teknoloji", en: "Mathematics + Technology" },
    story: {
      tr: "Aras, matematiğin çizebildiğini keşfetti. İki motor ve bir kalemle kurduğu makine, denklemleri kağıda spiral desenler olarak işliyor. En sevdiği kısım: sayıyı değiştirince desenin tamamen başkalaşması.",
      en: "Aras discovered that mathematics can draw. The machine he built from two motors and a pen renders equations onto paper as spiral patterns. His favorite part: change one number, and the whole pattern transforms.",
    },
    mechanics: [
      { tr: "İki adım motoru — kutupsal koordinatta çizim", en: "Two stepper motors — drawing in polar coordinates" },
      { tr: "Parametrik eğri üreteci — tek değişkenle desen ailesi", en: "Parametric curve generator — a family of patterns from one variable" },
      { tr: "Kalem kaldırma servosu — çizgiye nefes aldırır", en: "Pen-lift servo — lets the line breathe" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
