"use client";

import Link from "next/link";
import { chapters } from "@/content/chapters";
import { programs } from "@/content/programs";
import type { Locale } from "@/content/locale";
import { useChapter } from "@/motion/useChapter";
import { RoomRobotics } from "@/components/rooms/RoomRobotics";
import { RoomScience } from "@/components/rooms/RoomScience";
import { RoomMath } from "@/components/rooms/RoomMath";
import { RoomLogic } from "@/components/rooms/RoomLogic";
import { RoomTech } from "@/components/rooms/RoomTech";
import { hue } from "@/content/hues";

const byRoom = (room: string) => programs.find((p) => p.room === room)!;

function RoomHeader({
  index,
  locale,
  room,
  align = "left",
}: {
  index: number;
  locale: Locale;
  room: ReturnType<typeof byRoom>;
  align?: "left" | "right" | "center";
}) {
  const alignClass =
    align === "right" ? "items-end text-right" : align === "center" ? "items-center text-center" : "items-start";
  const accent = hue[room.room];
  return (
    <div className={`flex max-w-md flex-col ${alignClass}`}>
      <span className="instrument mb-3 block" style={{ color: accent }}>
        {locale === "tr" ? "ODA" : "ROOM"} {String(index).padStart(2, "0")}
      </span>
      <h3 className="display text-[clamp(1.7rem,3.4vw,2.7rem)] text-bone">
        {room.name[locale]}
      </h3>
      <p className="mt-3 text-ink">{room.tagline[locale]}</p>
      <Link
        href={`/${locale}/programs/${room.slug}`}
        className="instrument link-stroke mt-5 inline-block !text-bone/80"
      >
        {locale === "tr" ? "PROGRAMI İNCELE →" : "SEE THE PROGRAM →"}
      </Link>
    </div>
  );
}

/** Chapter 4 — five rooms, five kinds of physics. Deliberately, no two share a template. */
export function Disciplines({ locale }: { locale: Locale }) {
  const sectionRef = useChapter<HTMLElement>("disciplines", "visible");
  const c = chapters.disciplines;

  return (
    <section ref={sectionRef} className="pointer-events-auto relative">
      <div className="flex h-[50vh] items-center justify-center px-6">
        <h2 className="display max-w-[18ch] text-center text-[clamp(1.9rem,4vw,3.4rem)] text-bone">
          {c.heading[locale]}
        </h2>
      </div>

      {/* Room 01 — Robotics: schematic left-void, the arm owns the right */}
      <div
        data-stop="room-0"
        className="grid min-h-screen grid-cols-1 items-center gap-8 px-6 py-16 md:grid-cols-12 md:px-10"
        style={{ background: "radial-gradient(70% 60% at 75% 50%, rgba(46,134,214,0.08), transparent 70%)" }}
      >
        <div className="md:col-span-4">
          <RoomHeader index={1} locale={locale} room={byRoom("robotics")} />
        </div>
        <div className="h-[46vh] md:col-span-8 md:h-[70vh]">
          <RoomRobotics />
        </div>
      </div>

      {/* Room 02 — Science: full-bleed reaction chamber, header floats right */}
      <div
        data-stop="room-1"
        className="relative min-h-screen"
        style={{ background: "radial-gradient(65% 55% at 40% 55%, rgba(95,224,160,0.09), transparent 70%)" }}
      >
        <div className="absolute inset-0">
          <RoomScience />
        </div>
        <div className="pointer-events-none relative flex min-h-screen items-end justify-end px-6 py-20 md:px-10">
          <div className="pointer-events-auto">
            <RoomHeader index={2} locale={locale} room={byRoom("science")} align="right" />
          </div>
        </div>
      </div>

      {/* Room 03 — Mathematics: the curve is the altar, centered */}
      <div
        data-stop="room-2"
        className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-16"
        style={{ background: "radial-gradient(55% 55% at 50% 55%, rgba(169,140,255,0.10), transparent 70%)" }}
      >
        <RoomHeader index={3} locale={locale} room={byRoom("mathematics")} align="center" />
        <div className="h-[44vh] w-full md:h-[52vh]">
          <RoomMath />
        </div>
      </div>

      {/* Room 04 — Logic: the puzzle works while the copy watches */}
      <div
        data-stop="room-3"
        className="grid min-h-screen grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2 md:px-10"
        style={{ background: "radial-gradient(60% 55% at 35% 50%, rgba(255,194,75,0.08), transparent 70%)" }}
      >
        <div className="flex justify-center">
          <RoomLogic />
        </div>
        <div className="flex justify-center md:justify-start">
          <RoomHeader index={4} locale={locale} room={byRoom("logic")} />
        </div>
      </div>

      {/* Room 05 — Technology: a device boots as you arrive */}
      <div
        data-stop="room-4"
        className="flex min-h-screen flex-col items-center justify-center gap-10 px-6 py-16 md:flex-row md:gap-24"
        style={{ background: "radial-gradient(60% 55% at 62% 55%, rgba(255,122,182,0.09), transparent 70%)" }}
      >
        <RoomHeader index={5} locale={locale} room={byRoom("technology")} />
        <RoomTech locale={locale} />
      </div>
    </section>
  );
}
