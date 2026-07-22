import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/content/locale";
import { programs } from "@/content/programs";
import { site } from "@/content/site";
import { PageShell } from "@/components/ui/PageShell";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = isLocale(locale) ? locale : "tr";
  return {
    title: site.nav.programs[l],
    description: site.description[l],
  };
}

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <PageShell
      locale={locale}
      eyebrow={locale === "tr" ? "PROGRAMLAR" : "PROGRAMS"}
      title={locale === "tr" ? "Altı alan, tek amaç: kuran zihinler." : "Six fields, one aim: minds that build."}
      backHref={`/${locale}`}
      backLabel={locale === "tr" ? "DENEYİME DÖN" : "BACK TO THE EXPERIENCE"}
    >
      <div className="flex flex-col">
        {programs.map((program, i) => (
          <Link
            key={program.slug}
            href={`/${locale}/programs/${program.slug}`}
            className="group grid grid-cols-1 gap-2 border-t border-steel-soft py-8 transition-colors last:border-b hover:bg-graphite/40 md:grid-cols-12 md:items-baseline md:gap-6"
          >
            <span className="instrument md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
            <h2 className="display text-2xl text-bone transition-colors group-hover:text-ember md:col-span-5 md:text-3xl">
              {program.name[locale]}
            </h2>
            <p className="text-sm text-mist md:col-span-4">{program.tagline[locale]}</p>
            <span className="instrument text-[10px] md:col-span-2 md:text-right">
              {program.ages} · {program.format[locale]}
            </span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
