import type { L10n } from "./locale";

export const visitCopy = {
  heading: {
    tr: "Kampüsü yerinde görün.",
    en: "See the campus in person.",
  } satisfies L10n,
  intro: {
    tr: "Web sitesi yalnızca bir kıvılcım. Atölyeleri, laboratuvarları ve çocukların yaptıklarını yerinde görmek için 45 dakikalık bir kampüs turu planlayın. Ziyaret ücretsizdir ve hiçbir taahhüt gerektirmez.",
    en: "The website is only a spark. Book a 45-minute campus tour to see the workshops, the labs, and what children build here. Visits are free and carry no commitment.",
  } satisfies L10n,
  fields: {
    parentName: { tr: "Veli adı", en: "Parent name" } satisfies L10n,
    email: { tr: "E-posta", en: "Email" } satisfies L10n,
    childAge: { tr: "Çocuğun yaşı", en: "Child's age" } satisfies L10n,
    interest: { tr: "İlgi alanı", en: "Area of interest" } satisfies L10n,
    interestAny: { tr: "Henüz kararsızız", en: "Not decided yet" } satisfies L10n,
  },
  submit: { tr: "Ziyaret Talebi Gönder", en: "Request a Visit" } satisfies L10n,
  privacyNote: {
    tr: "Yalnızca randevunuzu planlamak için gereken bilgileri istiyoruz. Verileriniz üçüncü taraflarla paylaşılmaz. (KVKK)",
    en: "We ask only for what's needed to schedule your visit. Your data is never shared with third parties. (KVKK/GDPR)",
  } satisfies L10n,
  success: {
    tr: "Talebiniz alındı. 24 saat içinde e-posta ile dönüş yapacağız.",
    en: "Request received. We'll reply by email within 24 hours.",
  } satisfies L10n,
} as const;
