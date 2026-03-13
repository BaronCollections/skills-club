"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Discover" },
  { href: "/rankings", label: "Rankings" },
  { href: "/studio", label: "AI Studio" },
  { href: "/workspace", label: "Workspace" },
];

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,_rgba(242,166,90,0.18),_transparent_45%),radial-gradient(circle_at_top_right,_rgba(14,124,102,0.22),_transparent_42%),radial-gradient(circle_at_center,_rgba(19,42,19,0.08),_transparent_55%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-5 pb-10 pt-5 sm:px-8 lg:px-10">
        <header className="surface sticky top-5 z-20 mb-8 flex flex-col gap-4 px-5 py-4 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--accent-ink)] text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-[var(--surface)]">
                ASH
              </div>
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                  AI Skills Hub
                </p>
                <p className="text-sm text-[var(--foreground)]">
                  Discover, rank, generate, publish.
                </p>
              </div>
            </Link>
            <div className="hidden rounded-full border border-[var(--line)] bg-white/60 px-3 py-1 text-xs text-[var(--muted)] xl:block">
              GitHub-first index • trust-aware ranking
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center lg:justify-end">
            <nav className="flex flex-wrap items-center gap-2">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === item.href
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      isActive
                        ? "bg-[var(--accent-ink)] text-[var(--surface)]"
                        : "bg-white/70 text-[var(--foreground)] hover:bg-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden min-w-[18rem] items-center gap-3 rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-sm text-[var(--muted)] lg:flex">
                <span className="text-[var(--accent-ink)]">Search</span>
                <span className="truncate">
                  SKILL.md, AGENTS.md, Cursor rules, MCP tools...
                </span>
              </div>
              <Link
                href="/studio"
                className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--surface)] transition hover:bg-[var(--accent-ink)]"
              >
                Launch Studio
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-10 grid gap-4 rounded-[2rem] border border-[var(--line)] bg-white/70 px-5 py-5 text-sm text-[var(--muted)] backdrop-blur-xl lg:grid-cols-[1fr_auto_auto] lg:items-center">
          <p>
            AI Skills Hub v0.1 planning build. Discovery, ranking, generation, and
            GitHub publishing in one web control plane.
          </p>
          <Link href="/rankings" className="hover:text-[var(--foreground)]">
            Ranking model
          </Link>
          <Link href="/studio" className="hover:text-[var(--foreground)]">
            Generation workflow
          </Link>
        </footer>
      </div>
    </div>
  );
}

