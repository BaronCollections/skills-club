import { activityFeed, workspaceCollections } from "@/lib/mock-data";

export default function WorkspacePage() {
  return (
    <div className="space-y-6 pb-6">
      <section className="surface p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
          Workspace
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl [font-family:var(--font-display)]">
          Save what matters, revisit drafts, and track what is moving.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted)]">
          This area becomes the personal operating layer for favorites, generated
          skills, and watched rankings.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_24rem]">
        <div className="space-y-6">
          <div className="grid gap-4 xl:grid-cols-3">
            {workspaceCollections.map((collection) => (
              <div key={collection.title} className="surface p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Collection
                </p>
                <h2 className="mt-3 text-2xl [font-family:var(--font-display)]">
                  {collection.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {collection.description}
                </p>
                <div className="mt-5 rounded-full bg-[var(--surface-alt)] px-4 py-3 text-sm text-[var(--foreground)]">
                  {collection.count} saved skills
                </div>
              </div>
            ))}
          </div>

          <div className="surface p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                  Draft overview
                </p>
                <h2 className="mt-3 text-2xl [font-family:var(--font-display)]">
                  Current personal pipeline
                </h2>
              </div>
              <div className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm text-[var(--surface)]">
                4 active drafts
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                ["Ready to publish", "2"],
                ["Waiting on tokens", "1"],
                ["Need another reference", "1"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-[1.5rem] bg-[var(--surface-alt)] px-4 py-4"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                    {label}
                  </p>
                  <p className="mt-3 text-3xl [font-family:var(--font-display)]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="surface p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
            Recent activity
          </p>
          <div className="mt-5 space-y-4">
            {activityFeed.map((item, index) => (
              <div key={item} className="flex gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--accent-ink)] text-sm font-semibold text-[var(--surface)]">
                  0{index + 1}
                </div>
                <p className="pt-2 text-sm leading-7 text-[var(--muted)]">{item}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}

