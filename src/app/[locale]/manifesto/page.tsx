import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/content/locale";
import { manifesto } from "@/content/manifesto";
import { PageShell } from "@/components/ui/PageShell";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = isLocale(locale) ? locale : "tr";
  return {
    title: "Manifesto",
    description:
      l === "tr"
        ? "ROBOKAMPÜS pedagojisi: merak, deney, hata, yineleme ve yaratım üzerine beş ilke."
        : "The ROBOKAMPÜS pedagogy: five principles on curiosity, experiment, failure, iteration and creation.",
  };
}

/** For the validators: the pedagogy, stated plainly. */
export default async function ManifestoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <PageShell
      locale={locale}
      eyebrow="MANİFESTO"
      title={
        locale === "tr"
          ? "Nasıl öğrettiğimizin beş ilkesi."
          : "Five principles of how we teach."
      }
      backHref={`/${locale}`}
      backLabel={locale === "tr" ? "DENEYİME DÖN" : "BACK TO THE EXPERIENCE"}
    >
      <div className="flex max-w-2xl flex-col gap-16">
        {manifesto.map((principle, i) => (
          <section key={i} className="grid grid-cols-12 gap-4">
            <span className="instrument col-span-12 pt-1 !text-ember md:col-span-2">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="col-span-12 md:col-span-10">
              <h2 className="display text-2xl text-bone md:text-3xl">
                {principle.title[locale]}
              </h2>
              <p className="mt-4 leading-relaxed text-ink">{principle.body[locale]}</p>
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
