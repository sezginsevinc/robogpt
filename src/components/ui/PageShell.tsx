import Link from "next/link";
import type { Locale } from "@/content/locale";

/** Shared chrome for secondary routes: same dark world, lower motion intensity. */
export function PageShell({
  locale,
  eyebrow,
  title,
  intro,
  backHref,
  backLabel,
  children,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  intro?: string;
  backHref?: string;
  backLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative z-10 mx-auto min-h-screen w-full max-w-5xl px-6 pb-28 pt-32 md:px-10 md:pt-40">
      {backHref && (
        <Link href={backHref} className="instrument link-stroke mb-10 inline-block !text-bone/70">
          ← {backLabel ?? (locale === "tr" ? "GERİ" : "BACK")}
        </Link>
      )}
      <span className="instrument mb-5 block !text-ember">{eyebrow}</span>
      <h1 className="display max-w-[18ch] text-[clamp(2.2rem,5.5vw,4.2rem)] text-bone">{title}</h1>
      {intro && <p className="mt-7 max-w-xl text-lg text-ink">{intro}</p>}
      <div className="mt-16">{children}</div>
    </main>
  );
}
