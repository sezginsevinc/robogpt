import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { clash, satoshi, jetbrains } from "@/lib/fonts";
import { locales, isLocale, type Locale } from "@/content/locale";
import { site } from "@/content/site";
import { ExperienceProvider } from "@/components/providers/ExperienceProvider";
import { Hud } from "@/components/hud/Hud";
import { EmberCursor } from "@/components/hud/EmberCursor";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "tr";
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${site.tagline[locale]}`,
      template: `%s — ${site.name}`,
    },
    description: site.description[locale],
    alternates: {
      canonical: `/${locale}`,
      languages: { tr: "/tr", en: "/en" },
    },
    openGraph: {
      title: `${site.name} — ${site.tagline[locale]}`,
      description: site.description[locale],
      url: `/${locale}`,
      siteName: site.name,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    description: site.description[locale],
    url: `${site.url}/${locale}`,
    slogan: site.tagline[locale],
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: locale === "tr" ? "Çocuklar (6–14 yaş)" : "Children (ages 6–14)",
    },
  };

  return (
    <html lang={locale} className={`${clash.variable} ${satoshi.variable} ${jetbrains.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ExperienceProvider>
          <Hud locale={locale} />
          {children}
          <EmberCursor />
        </ExperienceProvider>
      </body>
    </html>
  );
}
