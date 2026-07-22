"use client";

import { useState } from "react";
import { visitCopy } from "@/content/visit";
import { programs } from "@/content/programs";
import type { Locale } from "@/content/locale";

const inputClass =
  "w-full rounded-sm border border-steel-soft bg-graphite/70 px-4 py-3 text-bone placeholder:text-mist/60 focus:border-ember/70 focus:outline-none transition-colors";

/**
 * Visit request form. Minimal by design (KVKK): only what scheduling needs.
 * Submission endpoint is wired at launch; until then it confirms locally.
 */
export function VisitForm({ locale }: { locale: Locale }) {
  const [sent, setSent] = useState(false);
  const f = visitCopy.fields;

  if (sent) {
    return (
      <div className="glass max-w-lg rounded-lg p-8">
        <span
          className="mb-5 block size-2.5 rounded-full bg-ember"
          style={{ boxShadow: "0 0 12px rgba(255,122,26,0.9)" }}
        />
        <p className="display text-2xl text-bone">{visitCopy.success[locale]}</p>
      </div>
    );
  }

  return (
    <form
      className="flex max-w-lg flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label className="flex flex-col gap-2">
        <span className="instrument text-[10px]">{f.parentName[locale]}</span>
        <input required name="parentName" autoComplete="name" className={inputClass} />
      </label>
      <label className="flex flex-col gap-2">
        <span className="instrument text-[10px]">{f.email[locale]}</span>
        <input required type="email" name="email" autoComplete="email" className={inputClass} />
      </label>
      <div className="grid grid-cols-2 gap-5">
        <label className="flex flex-col gap-2">
          <span className="instrument text-[10px]">{f.childAge[locale]}</span>
          <input required type="number" min={4} max={17} name="childAge" className={inputClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span className="instrument text-[10px]">{f.interest[locale]}</span>
          <select name="interest" className={inputClass} defaultValue="">
            <option value="">{f.interestAny[locale]}</option>
            {programs.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name[locale]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button
        type="submit"
        data-interactive
        className="instrument mt-3 self-start rounded-full bg-ember px-7 py-3.5 !text-void transition-shadow duration-500 hover:shadow-[0_0_24px_rgba(255,122,26,0.45)]"
      >
        {visitCopy.submit[locale]}
      </button>
      <p className="mt-2 max-w-md text-xs leading-relaxed text-mist">
        {visitCopy.privacyNote[locale]}
      </p>
    </form>
  );
}
