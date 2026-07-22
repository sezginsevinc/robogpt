import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { locales, isLocale } from "@/content/locale";
import { programs, getProgram } from "@/content/programs";
import { site } from "@/content/site";
import { PageShell } from "@/components/ui/PageShell";

export function generateStaticParams() {
  return locales.flatMap((locale) => programs.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = isLocale(locale) ? locale : "tr";
  const program = getProgram(slug);
  if (!program) return {};
  return {
    title: program.name[l],
    description: program.description[l],
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const program = getProgram(slug);
  if (!program) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.name[locale],
    description: program.description[locale],
    provider: { "@type": "EducationalOrganization", name: site.name, url: site.url },
  };

  const others = programs.filter((p) => p.slug !== slug);

  return (
    <PageShell
      locale={locale}
      eyebrow={`${locale === "tr" ? "PROGRAM" : "PROGRAM"} · ${program.ages} ${locale === "tr" ? "YAŞ" : "YRS"}`}
      title={program.name[locale]}
      intro={program.tagline[locale]}
      backHref={`/${locale}/programs`}
      backLabel={locale === "tr" ? "TÜM PROGRAMLAR" : "ALL PROGRAMS"}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="text-lg leading-relaxed text-ink">{program.description[locale]}</p>
          <div className="mt-10 flex flex-wrap gap-x-12 gap-y-5 border-t border-steel-soft pt-7">
            <div>
              <span className="instrument block text-[10px]">
                {locale === "tr" ? "YAŞ ARALIĞI" : "AGE RANGE"}
              </span>
              <span className="display mt-1 block text-xl text-bone">{program.ages}</span>
            </div>
            <div>
              <span className="instrument block text-[10px]">
                {locale === "tr" ? "FORMAT" : "FORMAT"}
              </span>
              <span className="display mt-1 block text-xl text-bone">
                {program.format[locale]}
              </span>
            </div>
          </div>
          <Link
            href={`/${locale}/visit`}
            className="instrument mt-12 inline-block rounded-full bg-ember px-7 py-3.5 !text-void"
          >
            {site.cta.visit[locale]}
          </Link>
        </div>
        <aside className="md:col-span-4 md:col-start-9">
          <span className="instrument mb-5 block text-[10px]">
            {locale === "tr" ? "DİĞER ALANLAR" : "OTHER FIELDS"}
          </span>
          <ul className="flex flex-col gap-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${locale}/programs/${p.slug}`}
                  className="link-stroke text-sm text-ink transition-colors hover:text-bone"
                >
                  {p.name[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </PageShell>
  );
}
