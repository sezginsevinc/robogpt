import { notFound } from "next/navigation";
import { isLocale } from "@/content/locale";
import { CanvasRoot } from "@/components/providers/CanvasRoot";
import { Hero } from "@/components/chapters/Hero";
import { Curiosity } from "@/components/chapters/Curiosity";
import { Discovery } from "@/components/chapters/Discovery";
import { Creation } from "@/components/chapters/Creation";
import { ProjectOverlay } from "@/components/chapters/ProjectOverlay";
import { Disciplines } from "@/components/chapters/Disciplines";
import { Journey } from "@/components/chapters/Journey";
import { Proof } from "@/components/chapters/Proof";
import { Trust } from "@/components/chapters/Trust";
import { Campus } from "@/components/chapters/Campus";
import { Epilogue } from "@/components/chapters/Epilogue";
import { ScrollNav } from "@/components/hud/ScrollNav";

/** The Experience — eight chapters, one scroll. */
export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <CanvasRoot locale={locale} />
      {/* pointer-events-none lets Chapter 3/8 interactions fall through to the
          canvas; every DOM-interactive chapter re-enables its own events. */}
      <main id="experience" className="pointer-events-none relative z-10">
        <Hero locale={locale} />
        <Curiosity locale={locale} />
        <Discovery locale={locale} />
        <Creation locale={locale} />
        <Disciplines locale={locale} />
        <Journey locale={locale} />
        <Proof locale={locale} />
        <Trust locale={locale} />
        <Campus locale={locale} />
        <Epilogue locale={locale} />
      </main>
      <ScrollNav locale={locale} />
      <ProjectOverlay locale={locale} />
    </>
  );
}
