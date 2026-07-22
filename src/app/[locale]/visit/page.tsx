import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/content/locale";
import { visitCopy } from "@/content/visit";
import { site } from "@/content/site";
import { PageShell } from "@/components/ui/PageShell";
import { VisitForm } from "@/components/ui/VisitForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = isLocale(locale) ? locale : "tr";
  return { title: site.cta.visit[l], description: visitCopy.intro[l] };
}

/** The primary conversion: the site sells the visit; the visit sells the enrollment. */
export default async function VisitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <PageShell
      locale={locale}
      eyebrow={locale === "tr" ? "ZİYARET" : "VISIT"}
      title={visitCopy.heading[locale]}
      intro={visitCopy.intro[locale]}
      backHref={`/${locale}`}
      backLabel={locale === "tr" ? "DENEYİME DÖN" : "BACK TO THE EXPERIENCE"}
    >
      <VisitForm locale={locale} />
    </PageShell>
  );
}
