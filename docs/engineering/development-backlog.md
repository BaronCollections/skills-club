# Development Backlog

Last updated: 2026-03-13

## Build Strategy

The product will be built in vertical slices, but the first implementation wave should still respect foundational dependencies:

1. Repository and app foundation
2. Data model and ingestion contract
3. Discovery UI
4. Ranking
5. AI generation studio
6. Auth and GitHub publishing
7. Safety, QA, and production hardening

## Epic 1: Repository Foundation

### P0

- Initialize git repository
- Add remote for `https://github.com/BaronCollections/skills-club`
- Scaffold Next.js app with TypeScript, Tailwind CSS, ESLint
- Prepare shadcn/ui-ready component structure
- Add `.env.example`
- Add base project README and docs index

### Acceptance criteria

- `npm run dev` boots successfully
- Core lint command exists
- App has a stable route structure and shared layout

## Epic 2: Information Architecture And UI Shell

### P0

- Top navigation: Home, Rankings, AI Studio, My Workspace
- Global search entry
- Desktop-first responsive layout
- Design tokens for color, spacing, typography, radii, and shadows
- Page containers and section primitives
- Empty/loading/error states

### P1

- Theme switch
- Breadcrumbs
- Keyboard-first search UX

### Acceptance criteria

- Every top-level route renders with a shared shell
- Layout works on 1440px and 1024px widths

## Epic 3: Core Data Model

### P0

- Define Prisma schema
- Model repositories, skills, skill versions, classifications, ranking snapshots, users, favorites
- Seed script with mock skills
- Add API-facing DTO contracts

### P1

- Generation sessions
- Publish jobs
- Notifications

### Acceptance criteria

- Database migrations succeed locally
- Seed data supports discovery and ranking pages

## Epic 4: Ingestion Pipeline v0

### P0

- Define crawler source abstraction
- Implement GitHub repository search ingestion contract
- Parse `SKILL.md`, `AGENTS.md`, and metadata patterns
- Deduplicate by normalized source identity + content hash
- Persist raw source metadata and normalized skill records

### P1

- Add official docs seed ingestion
- Add curated marketplace seed ingestion

### P2

- Trend enrichment from public discussion sources

### Acceptance criteria

- A crawl job can fetch and normalize sample source records
- Re-running the job does not duplicate identical entries

## Epic 5: Classification And Quality Layer

### P0

- Build deterministic heuristic classification baseline
- Infer tool platform, use case, domain, complexity
- Record confidence per classification field

### P1

- LLM-based enrichment fallback
- Quality score
- Provenance badges

### P2

- Risk scoring integration

### Acceptance criteria

- Sample dataset receives visible tags and confidence values

## Epic 6: Discovery Home And Search

### P0

- Search input
- Faceted filters
- Sort selector
- Card and list modes
- Pagination or infinite load
- Skill card component with badges and metrics

### P1

- Saved views
- Compare skills

### Acceptance criteria

- Users can discover skills from mock or seeded data
- Filter state is shareable via URL params

## Epic 7: Skill Detail Page

### P0

- Hero section with title, source, trust badges
- Metric summary
- Parsed overview and category tags
- Content preview panel
- Related skills section
- Favorite action

### P1

- Version timeline
- Diff between versions
- Install snippets by platform

### Acceptance criteria

- Every skill has a canonical detail route

## Epic 8: Rankings

### P0

- Overall, rising, new, category ranking tabs
- Day, week, month, all-time switches
- Ranking table and compact mobile fallback
- Trend visualization placeholder or initial chart

### P1

- Creator ranking
- Ranking explanation modal

### Acceptance criteria

- Ranking views can be driven from snapshot records

## Epic 9: AI Generation Studio

### P0

- Reference skill picker
- Prompt input
- Mode switch: custom, enhance, fusion
- Provider/model selection
- Generated result preview
- Regenerate and edit loop

### P1

- Side-by-side diff against references
- Multi-turn chat history
- Preset output templates

### Acceptance criteria

- User can generate a draft package from selected references and prompt

## Epic 10: Token Settings

### P0

- Add provider configuration UI
- Save encrypted token configuration
- Connection test endpoint
- Default provider selection

### P1

- Multiple model presets per provider
- Usage tips and pricing hints

### Acceptance criteria

- Tokens are never returned to the client in plain form after save

## Epic 11: Auth And Personal Workspace

### P0

- GitHub OAuth login
- Favorites
- History
- My generated skills

### P1

- Saved collections
- Workspace filters

### Acceptance criteria

- Authenticated users can persist personal data cleanly

## Epic 12: GitHub Publishing

### P0

- Create repository flow
- Auto-generate README
- Commit generated skill package
- Success and failure reporting

### P1

- Publish to existing repo path
- Update existing published skill

### Acceptance criteria

- Generated skill package can be published to a new GitHub repository

## Epic 13: Trust, Safety, And Governance

### P1

- Provenance badges
- License detection
- Repo health signals
- Risk flags
- Score explanation panel

### P2

- CI-integrated scanner
- Report history

### Acceptance criteria

- Users can understand why a skill is recommended and whether it appears risky

## Epic 14: Observability And Ops

### P1

- Job logs
- Crawl metrics
- Error reporting
- Audit events for sensitive actions

### P2

- Admin review dashboard
- Manual reindex triggers

### Acceptance criteria

- Operators can diagnose failed jobs and publishing issues

## Epic 15: QA And Release

### P0

- Lint
- Typecheck
- Smoke tests for main routes
- Seed data integration tests

### P1

- E2E flows for search, generation, publish
- Accessibility review
- Performance budget

### Acceptance criteria

- Main flows pass before deployment

## Suggested Build Order

### Sprint 1

- Epic 1
- Epic 2
- Epic 3

### Sprint 2

- Epic 4
- Epic 5
- Epic 6

### Sprint 3

- Epic 7
- Epic 8

### Sprint 4

- Epic 9
- Epic 10
- Epic 11

### Sprint 5

- Epic 12
- Epic 13
- Epic 14
- Epic 15

## Technical Risks

| Risk | Why it matters | Mitigation |
| --- | --- | --- |
| GitHub rate limits | Crawl coverage and freshness suffer | Authenticated API use, caching, tiered schedules |
| Duplicate and noisy records | Search quality degrades | Source identity normalization, content hashing, moderation tooling |
| Weak ranking trust | Users will distrust lists | Transparent signals and visible provenance |
| Token security | High-risk user trust problem | Encryption, minimal decryption surface, audit logs |
| AI generation inconsistency | Low-quality outputs reduce retention | Reference-aware prompts, versioned prompt templates, review loop |

## Definition Of Done For MVP

- Discovery, detail, and ranking pages work with seeded and ingested data
- GitHub-first ingestion pipeline runs on schedule
- AI generation studio produces structured outputs
- GitHub auth and new-repo publish flow work
- Primary routes are tested
- Deployment architecture and environment variables are documented

