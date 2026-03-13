import { notFound } from "next/navigation";

import { getSkillSlugs, getSkillDetailRecord } from "@/lib/queries/skills";

type SkillDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getSkillSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function SkillDetailPage({
  params,
}: SkillDetailPageProps) {
  const { slug } = await params;
  const skill = await getSkillDetailRecord(slug);

  if (!skill) {
    notFound();
  }

  return (
    <div className="space-y-6 pb-6">
      <section className="surface p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              <span className="rounded-full bg-[var(--surface-alt)] px-3 py-1 text-[var(--foreground)]">
                {skill.platform}
              </span>
              <span>{skill.category}</span>
              <span>{skill.domain}</span>
              <span>{skill.complexity}</span>
            </div>
            <h1 className="mt-5 text-4xl sm:text-5xl [font-family:var(--font-display)]">
              {skill.name}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted)]">
              {skill.description}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:w-[20rem]">
            {[
              ["Score", `${skill.score}/100`],
              ["Stars", skill.stars],
              ["Growth", skill.growth],
              ["Updated", skill.updatedAt],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[1.5rem] bg-[var(--surface-alt)] px-4 py-4"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  {label}
                </p>
                <p className="mt-2 text-xl font-semibold text-[var(--foreground)]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_24rem]">
        <div className="space-y-6">
          <div className="surface p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Why it matters
            </p>
            <p className="mt-4 text-base leading-8 text-[var(--foreground)]">
              {skill.whyItMatters}
            </p>
          </div>

          <div className="surface p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Parsed content preview
            </p>
            <pre className="mt-5 overflow-x-auto rounded-[1.75rem] bg-[var(--accent-ink)] px-5 py-5 font-mono text-sm leading-7 text-[var(--surface)]">
              {skill.content}
            </pre>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="surface p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Provenance snapshot
            </p>
            <div className="mt-5 space-y-3">
              {[
                ["Source", skill.source],
                ["Owner", skill.owner],
                ["License", skill.license],
                ["Status", "Indexed and normalized"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-[1.5rem] bg-[var(--surface-alt)] px-4 py-4"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                    {label}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--foreground)]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Related actions
            </p>
            <div className="mt-5 flex flex-col gap-3">
              {["Save to workspace", "Generate enhanced version", "Compare in rankings"].map(
                (item, index) => (
                  <button
                    key={item}
                    className={`rounded-full px-4 py-3 text-sm font-medium ${
                      index === 1
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
        </aside>
      </section>
    </div>
  );
}
