import { selectedStudioSkills, studioDraft } from "@/lib/mock-data";

export default function StudioPage() {
  return (
    <div className="space-y-6 pb-6">
      <section className="surface p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              AI Studio
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl [font-family:var(--font-display)]">
              Fuse strong references into publishable skills.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted)]">
              Users bring their own model tokens. The platform contributes
              retrieval, reference context, structure, and publish-ready packaging.
            </p>
          </div>

          <div className="rounded-full border border-[var(--line)] bg-white/75 px-4 py-3 text-sm text-[var(--foreground)]">
            Token status: OpenAI configured, Anthropic pending
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[23rem_1fr]">
        <aside className="surface p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                Selected references
              </p>
              <h2 className="mt-3 text-2xl [font-family:var(--font-display)]">
                3 skills loaded
              </h2>
            </div>
            <div className="rounded-full bg-[var(--surface-alt)] px-3 py-2 text-sm text-[var(--foreground)]">
              Fusion mode
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {selectedStudioSkills.map((skill) => (
              <div
                key={skill.slug}
                className="rounded-[1.5rem] border border-[var(--line)] bg-white/82 p-4"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  {skill.platform} • {skill.category}
                </p>
                <p className="mt-2 text-lg font-medium text-[var(--foreground)]">
                  {skill.name}
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>

          <button className="mt-5 w-full rounded-full border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-3 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--accent)]">
            Add another reference
          </button>
        </aside>

        <div className="space-y-6">
          <div className="surface p-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_15rem]">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                  Prompt
                </p>
                <div className="mt-4 rounded-[1.75rem] border border-[var(--line)] bg-white/82 p-5 text-sm leading-7 text-[var(--foreground)]">
                  I need a skill that reviews code changes, explains blast radius,
                  and prepares a release summary that product and engineering can
                  both use without extra rewriting.
                </div>
              </div>

              <div className="space-y-3">
                {[
                  "Target: Claude Code",
                  "Style: strict and action-first",
                  "Output: SKILL.md + README",
                  "Safety: no destructive commands",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] bg-[var(--surface-alt)] px-4 py-3 text-sm text-[var(--foreground)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {["Custom", "Enhance", "Fuse"].map((item, index) => (
                <div
                  key={item}
                  className={`rounded-full px-4 py-2 text-sm ${
                    index === 2
                      ? "bg-[var(--accent)] text-[var(--surface)]"
                      : "border border-[var(--line)] bg-white/75 text-[var(--foreground)]"
                  }`}
                >
                  {item}
                </div>
              ))}
              <button className="rounded-full bg-[var(--accent-ink)] px-5 py-2 text-sm font-medium text-[var(--surface)]">
                Generate draft
              </button>
            </div>
          </div>

          <div className="surface p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                  Generated preview
                </p>
                <h2 className="mt-3 text-2xl [font-family:var(--font-display)]">
                  Structured output ready for editing
                </h2>
              </div>
              <div className="rounded-full border border-[var(--line)] bg-white/75 px-4 py-2 text-sm text-[var(--foreground)]">
                README included
              </div>
            </div>

            <pre className="mt-5 overflow-x-auto rounded-[1.75rem] bg-[var(--accent-ink)] px-5 py-5 font-mono text-sm leading-7 text-[var(--surface)]">
              {studioDraft}
            </pre>

            <div className="mt-5 flex flex-wrap gap-3">
              {["Copy", "Open editor", "Regenerate", "Publish to GitHub"].map(
                (item, index) => (
                  <button
                    key={item}
                    className={`rounded-full px-4 py-3 text-sm font-medium ${
                      index === 3
                        ? "bg-[var(--accent)] text-[var(--surface)]"
                        : "border border-[var(--line)] bg-white/75 text-[var(--foreground)]"
                    }`}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

