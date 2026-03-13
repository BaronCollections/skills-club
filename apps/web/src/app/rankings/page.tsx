import { rankingModes } from "@/lib/mock-data";
import { getRankingRowRecords } from "@/lib/queries/skills";

export default async function RankingsPage() {
  const rankingRows = await getRankingRowRecords();

  return (
    <div className="space-y-6 pb-6">
      <section className="surface p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Rankings
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl [font-family:var(--font-display)]">
              Explainable leaderboards for the AI skills ecosystem.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted)]">
              Heat score combines repository popularity, maintenance, freshness, and
              platform engagement. The interface should make ranking legible, not
              magical.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {["Daily", "Weekly", "Monthly", "All time"].map((item, index) => (
              <div
                key={item}
                className={`rounded-full px-4 py-3 text-sm ${
                  index === 1
                    ? "bg-[var(--accent-ink)] text-[var(--surface)]"
                    : "border border-[var(--line)] bg-white/70 text-[var(--foreground)]"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="surface p-4 sm:p-6">
          <div className="flex flex-wrap gap-3 border-b border-[var(--line)] pb-5">
            {rankingModes.map((mode, index) => (
              <div
                key={mode}
                className={`rounded-full px-4 py-2 text-sm ${
                  index === 0
                    ? "bg-[var(--accent)] text-[var(--surface)]"
                    : "bg-[var(--surface-alt)] text-[var(--foreground)]"
                }`}
              >
                {mode}
              </div>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-white/85">
            <div className="grid grid-cols-[5rem_1.4fr_1fr_1fr_7rem] gap-3 border-b border-[var(--line)] px-4 py-4 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              <span>Rank</span>
              <span>Skill</span>
              <span>Platform</span>
              <span>Creator</span>
              <span className="text-right">Heat</span>
            </div>

            {rankingRows.map((row) => (
              <div
                key={row.rank}
                className="grid grid-cols-[5rem_1.4fr_1fr_1fr_7rem] gap-3 border-b border-[var(--line)] px-4 py-5 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--accent-ink)] text-sm font-semibold text-[var(--surface)]">
                    {row.rank}
                  </div>
                </div>

                <div>
                  <p className="font-medium text-[var(--foreground)]">{row.name}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{row.category}</p>
                </div>

                <div className="text-sm text-[var(--foreground)]">{row.platform}</div>
                <div className="text-sm text-[var(--foreground)]">{row.creator}</div>

                <div className="text-right">
                  <p className="font-semibold text-[var(--foreground)]">{row.heat}</p>
                  <p className="mt-1 text-sm text-[var(--accent)]">{row.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="surface p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Score model v0
            </p>
            <div className="mt-5 space-y-4">
              {[
                ["35%", "Repository popularity"],
                ["20%", "Recent maintenance"],
                ["15%", "Discussion signal"],
                ["10%", "Freshness"],
                ["10%", "Platform engagement"],
                ["10%", "Quality and trust"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[1.5rem] bg-[var(--surface-alt)] px-4 py-4"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                    {label}
                  </p>
                  <p className="mt-2 text-2xl [font-family:var(--font-display)]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Why this page matters
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              Most current skill catalogs stop at &quot;find and install&quot;. AI
              Skills Hub should help users understand why a skill is rising,
              whether it is maintained, and what kind of workflow it actually
              improves.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
