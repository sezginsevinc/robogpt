import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/content/locale";
import { PageShell } from "@/components/ui/PageShell";

export const metadata: Metadata = { title: "KVKK" };

/** Placeholder legal text — to be replaced by counsel-approved copy before launch. */
export default async function KvkkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const paragraphs =
    locale === "tr"
      ? [
          "ROBOKAMPÜS, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında veri sorumlusu olarak hareket eder.",
          "Web sitemizde varsayılan olarak üçüncü taraf izleyici kullanılmaz. Ziyaret talep formu yalnızca randevunuzu planlamak için gereken asgari bilgiyi toplar: veli adı, e-posta ve çocuğun yaşı. Bu bilgiler üçüncü taraflarla paylaşılmaz ve yalnızca randevu iletişimi için kullanılır.",
          "Çocuklara ait görseller, açık veli izni olmadan hiçbir mecrada yayınlanmaz.",
          "Bu metin taslaktır; yayına alınmadan önce hukuk danışmanı onayından geçirilecektir.",
        ]
      : [
          "ROBOKAMPÜS acts as data controller under Turkish data protection law (KVKK, Law No. 6698) and applies GDPR-equivalent care.",
          "This website uses no third-party trackers by default. The visit request form collects only the minimum needed to schedule your visit: parent name, email and the child's age. This data is never shared with third parties and is used only for scheduling communication.",
          "Images of children are never published anywhere without explicit parental consent.",
          "This text is a draft; it will be reviewed by counsel before launch.",
        ];

  return (
    <PageShell
      locale={locale}
      eyebrow={locale === "tr" ? "YASAL" : "LEGAL"}
      title={locale === "tr" ? "Kişisel verilerin korunması" : "Data protection"}
      backHref={`/${locale}`}
      backLabel={locale === "tr" ? "DENEYİME DÖN" : "BACK TO THE EXPERIENCE"}
    >
      <div className="flex max-w-2xl flex-col gap-5">
        {paragraphs.map((p, i) => (
          <p key={i} className="leading-relaxed text-ink">
            {p}
          </p>
        ))}
      </div>
    </PageShell>
  );
}
