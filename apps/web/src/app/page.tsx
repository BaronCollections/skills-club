import Link from "next/link";

import { SkillCard } from "@/components/skill-card";
import { sourceHighlights } from "@/lib/mock-data";
import {
  getFeaturedSkillRecords,
  getRankingRowRecords,
} from "@/lib/queries/skills";

export default async function Home() {
  const featuredSkills = await getFeaturedSkillRecords();
  const rankingRows = await getRankingRowRecords();
  const spotlight = featuredSkills[0];

  return (
    <div className="space-y-6 pb-6">
      <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="surface overflow-hidden p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            <span className="rounded-full bg-[var(--surface-alt)] px-3 py-1 text-[var(--foreground)]">
              Phase 1 / Discovery OS
            </span>
            <span>GitHub-first</span>
            <span>Transparent ranking</span>
            <span>AI generation</span>
          </div>

          <div className="mt-8 max-w-4xl space-y-6">
            <h1 className="max-w-4xl text-5xl leading-none sm:text-6xl lg:text-7xl [font-family:var(--font-display)]">
              Discover, rank, and forge the best AI skills on the web.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
              AI Skills Hub starts with the highest-signal sources first, then turns
              raw skill files into searchable assets, explainable rankings, and
              generation-ready building blocks.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto]">
            <div className="rounded-[1.75rem] border border-[var(--line)] bg-white/85 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                Search index
              </p>
              <p className="mt-2 text-lg text-[var(--foreground)]">
                SKILL.md, AGENTS.md, Cursor rules, MCP tools, official docs, and
                ranked GitHub repositories.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:flex-col">
              <Link
                href="/studio"
                className="rounded-full bg-[var(--accent-ink)] px-5 py-3 text-sm font-medium text-[var(--surface)] transition hover:bg-[var(--foreground)]"
              >
                Open AI Studio
              </Link>
              <Link
                href="/rankings"
                className="rounded-full border border-[var(--line)] bg-white/60 px-5 py-3 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--accent)] hover:bg-white"
              >
                View rankings
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { label: "Indexed skills target", value: "12k+" },
              { label: "Refresh cadence", value: "1h / 6h / 1d" },
              { label: "Generation modes", value: "Custom / Enhance / Fuse" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[1.75rem] bg-[var(--accent-ink)]/95 px-5 py-5 text-[var(--surface)]"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-white/70">
                  {item.label}
                </p>
                <p className="mt-3 text-2xl [font-family:var(--font-display)]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside className="surface p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
            Spotlight skill
          </p>
          <div className="mt-5 rounded-[2rem] bg-[var(--surface-alt)] p-5">
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
              <span className="rounded-full bg-white px-3 py-1 text-[var(--foreground)]">
                {spotlight.platform}
              </span>
              <span>{spotlight.category}</span>
            </div>
            <h2 className="mt-5 text-4xl leading-tight [font-family:var(--font-display)]">
              {spotlight.name}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              {spotlight.whyItMatters}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              { label: "Score", value: `${spotlight.score}/100` },
              { label: "Stars", value: spotlight.stars },
              { label: "Growth", value: spotlight.growth },
              { label: "Updated", value: spotlight.updatedAt },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[1.5rem] border border-[var(--line)] bg-white/80 px-4 py-4"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                  {item.label}
                </p>
                <p className="mt-2 text-xl font-semibold text-[var(--foreground)]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {spotlight ? (
            <Link
              href={`/skills/${spotlight.slug}`}
              className="mt-5 inline-flex rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-[var(--surface)] transition hover:bg-[var(--accent-ink)]"
            >
              Inspect skill detail
            </Link>
          ) : null}
        </aside>
      </section>

      <section className="surface p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Product edge
            </p>
            <h2 className="mt-3 text-3xl [font-family:var(--font-display)]">
              More than a directory, less vague than a generic AI builder.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {sourceHighlights.map((item) => (
              <div
                key={item}
                className="rounded-full border border-[var(--line)] bg-white/75 px-4 py-3 text-sm text-[var(--foreground)]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                Featured collection
              </p>
              <h2 className="mt-3 text-3xl [font-family:var(--font-display)]">
                High-signal skills to seed discovery and generation
              </h2>
            </div>
            <Link href="/workspace" className="text-sm text-[var(--accent-ink)]">
              See workspace
            </Link>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            {featuredSkills.map((skill) => (
              <SkillCard key={skill.slug} skill={skill} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="surface p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Ranking snapshot
            </p>
            <div className="mt-5 space-y-3">
              {rankingRows.map((row) => (
                <div
                  key={row.rank}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-[1.5rem] bg-white/78 px-4 py-4"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--accent-ink)] text-sm font-semibold text-[var(--surface)]">
                    {row.rank}
                  </div>
                  <div>
                    <p className="font-medium text-[var(--foreground)]">{row.name}</p>
                    <p className="text-sm text-[var(--muted)]">
                      {row.platform} • {row.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[var(--foreground)]">
                      {row.heat}
                    </p>
                    <p className="text-sm text-[var(--accent)]">{row.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="surface p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Workflow
            </p>
            <div className="mt-5 space-y-4">
              {[
                "Ingest GitHub-first sources into a normalized skill graph.",
                "Classify platform, scenario, complexity, and provenance.",
                "Use selected skills as references in the AI studio.",
              ].map((step, index) => (
                <div key={step} className="flex gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--surface-alt)] text-sm font-semibold text-[var(--accent-ink)]">
                    0{index + 1}
                  </div>
                  <p className="pt-2 text-sm leading-7 text-[var(--muted)]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
