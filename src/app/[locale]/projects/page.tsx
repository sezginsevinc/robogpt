import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/content/locale";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { PageShell } from "@/components/ui/PageShell";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = isLocale(locale) ? locale : "tr";
  return { title: site.nav.projects[l], description: site.description[l] };
}

/** The artifact archive — Chapter 3, expanded and crawlable. */
export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <PageShell
      locale={locale}
      eyebrow={locale === "tr" ? "ARTEFAKT ARŞİVİ" : "ARTIFACT ARCHIVE"}
      title={
        locale === "tr"
          ? "Çocukların yaptıkları. Hepsi çalışıyor."
          : "Built by children. All of it runs."
      }
      backHref={`/${locale}`}
      backLabel={locale === "tr" ? "DENEYİME DÖN" : "BACK TO THE EXPERIENCE"}
    >
      <div className="flex flex-col gap-20">
        {projects.map((project, i) => (
          <article
            key={project.slug}
            className="grid grid-cols-1 gap-8 border-t border-steel-soft pt-10 md:grid-cols-12"
          >
            <div className="md:col-span-4">
              <span className="instrument block text-[10px] !text-ember">
                {locale === "tr" ? "ARTEFAKT" : "ARTIFACT"} {String(i + 1).padStart(2, "0")} ·{" "}
                {project.year}
              </span>
              <h2 className="display mt-3 text-3xl text-bone">{project.name[locale]}</h2>
              <p className="instrument mt-3">
                {project.builder[locale]} · {project.discipline[locale]}
              </p>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <p className="text-ink">{project.story[locale]}</p>
              <span className="instrument mb-3 mt-8 block text-[10px]">
                {locale === "tr" ? "İÇ MEKANİK" : "INTERNAL MECHANICS"}
              </span>
              <ul className="flex flex-col gap-2.5">
                {project.mechanics.map((m, j) => (
                  <li key={j} className="flex gap-3 text-sm text-ink">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ember" />
                    {m[locale]}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
