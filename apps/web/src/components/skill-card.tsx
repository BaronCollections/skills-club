import Link from "next/link";

import type { SkillRecord } from "@/lib/mock-data";

export function SkillCard({ skill }: { skill: SkillRecord }) {
  return (
    <article className="surface group flex h-full flex-col justify-between gap-5 p-5 transition hover:-translate-y-1 hover:bg-white">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
          <span className="rounded-full bg-[var(--surface-alt)] px-3 py-1 text-[var(--foreground)]">
            {skill.platform}
          </span>
          <span>{skill.category}</span>
          <span>{skill.domain}</span>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl [font-family:var(--font-display)]">
            {skill.name}
          </h3>
          <p className="text-sm leading-7 text-[var(--muted)]">
            {skill.description}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-2xl bg-[var(--surface-alt)] px-3 py-3">
            <p className="text-[var(--muted)]">Stars</p>
            <p className="mt-1 font-semibold text-[var(--foreground)]">{skill.stars}</p>
          </div>
          <div className="rounded-2xl bg-[var(--surface-alt)] px-3 py-3">
            <p className="text-[var(--muted)]">Growth</p>
            <p className="mt-1 font-semibold text-[var(--accent)]">{skill.growth}</p>
          </div>
          <div className="rounded-2xl bg-[var(--surface-alt)] px-3 py-3">
            <p className="text-[var(--muted)]">Score</p>
            <p className="mt-1 font-semibold text-[var(--foreground)]">
              {skill.score}/100
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-[var(--line)] pt-4 text-sm">
          <div>
            <p className="text-[var(--foreground)]">{skill.source}</p>
            <p className="text-[var(--muted)]">Updated {skill.updatedAt}</p>
          </div>
          <Link
            href={`/skills/${skill.slug}`}
            className="rounded-full border border-[var(--line)] px-4 py-2 font-medium text-[var(--foreground)] transition hover:border-[var(--accent)] hover:bg-[var(--surface-alt)]"
          >
            View detail
          </Link>
        </div>
      </div>
    </article>
  );
}

