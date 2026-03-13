# AI Skills Hub PRD v1.1

Document version: v1.1  
Created: 2026-03-11  
Revised: 2026-03-13  
Status: Draft for implementation kickoff

## 1. Product Summary

AI Skills Hub is a PC web platform for discovering, analyzing, ranking, generating, and publishing AI agent skills.

Version 1.1 refines the original PRD in one important way:

- Vision remains "global skills aggregation"
- MVP scope becomes "GitHub-first skills search and generation platform with ranking and provenance"

This keeps the long-term ambition intact while making the first release technically and operationally realistic.

## 2. Product Positioning

### One-line positioning

The fastest way to discover high-quality AI skills, generate better ones, and publish them back to GitHub.

### Strategic position

AI Skills Hub is not just a marketplace and not just a generator. It is the product layer on top of the emerging Agent Skills ecosystem.

### Core differentiation

1. Automated ingestion instead of manual-only curation
2. Cross-ecosystem normalization instead of single-tool lock-in
3. Transparent ranking and trust signals instead of raw lists
4. AI-powered skill generation and composition
5. GitHub publishing loop to close discovery -> creation -> distribution

## 3. Goals

| ID | Goal | Description |
| --- | --- | --- |
| G1 | One-stop discovery | Users can find high-quality skills from multiple ecosystems in one place |
| G2 | Intelligent creation | Users can generate new or improved skills from existing references |
| G3 | Ecosystem loop | Users can discover, save, fork, create, and publish without leaving the platform |
| G4 | Trust and clarity | Users can understand provenance, freshness, and risk before they install or reuse a skill |

## 4. Non-goals For MVP

- Full Discord or private community crawling
- Enterprise org management
- Paid marketplace features
- Full private skill collaboration suite
- Mobile-first UI

## 5. Target Users

| Persona | Need | Value |
| --- | --- | --- |
| AI developer | Find practical skills across tools fast | Saves search and experimentation time |
| Product manager | Understand trends and popular workflows | Improves tooling decisions |
| Beginner user | Generate customized skills without knowing the full spec | Lowers entry barrier |
| Open-source contributor | Publish polished skills quickly | Simplifies release workflow |
| Team lead | Curate a shared internal toolbox | Standardizes workflows |

## 6. MVP Scope

### 6.1 Core user-facing modules

1. Discovery home
2. Search and filter
3. Skill detail page
4. Rankings
5. AI generation studio
6. Token settings
7. GitHub login
8. Basic favorites and history

### 6.2 Core system modules

1. GitHub-first crawler
2. Normalization pipeline
3. Classification pipeline
4. Ranking engine
5. LLM orchestration service
6. GitHub publishing service

## 7. Revised Functional Requirements

### R01 Discovery and search

Users can search by:

- Skill name
- Description
- Tool platform
- Use case
- Technology domain
- File format or standard
- Author or repository

Users can filter by:

- Source type
- Platform
- Category
- Complexity
- Freshness
- Risk level
- License

### R02 Skill detail

Each skill detail page includes:

- Core description
- Source repository and path
- Source type and provenance badge
- Last indexed time
- Last upstream commit time
- Stars, forks, discussions, watchers, release or tag signal when available
- Parsed metadata and inferred categories
- Full skill content preview
- Install guidance
- Related and similar skills
- Risk notes and quality score when available

### R03 Ingestion engine

MVP sources:

- GitHub repositories
- Official documentation pages that publish install or usage references
- Selected public marketplaces as discovery seeds

V1 sources after MVP:

- npm and PyPI package manifests with skill references
- Reddit and Hacker News for trend enrichment
- Public Discord summaries or community directories if compliant

### R04 Classification engine

The system classifies every indexed skill along:

- Platform: Claude Code, Codex, Cursor, Letta, generic Agent Skills, MCP-adjacent
- Use case: coding, review, docs, DevOps, security, analysis, design, productivity
- Domain: frontend, backend, full stack, AI/ML, infra, product, data
- Complexity: beginner, intermediate, advanced, expert
- Package risk: low, medium, high, unknown

### R05 Ranking engine

Support:

- Overall ranking
- Rising ranking
- New ranking
- Category ranking
- Creator ranking

Default score inputs:

- GitHub stars
- Forks
- Recent commits
- Issue/discussion activity
- Freshness
- Platform engagement data
- Saves and generation reuse count

### R06 AI generation studio

Modes:

- Custom generation
- Enhancement
- Fusion

Inputs:

- One or more reference skills
- User prompt
- Target platform
- Preferred style or constraints
- Optional provider/model selection

Outputs:

- Generated skill package draft
- README draft
- Metadata draft
- Explanation of what changed relative to references

### R07 Token settings

Users can configure:

- Provider
- API key
- Model
- Base URL
- Default provider

Security baseline:

- Encrypt at rest
- Never expose decrypted tokens to the client after save
- Prefer local-first or user-controlled usage where feasible

### R08 GitHub publishing

Users can:

- Authenticate with GitHub
- Create a new repository from generated content
- Generate README automatically
- Push updates to previously published skills in later versions

### R09 Personal workspace

Users can:

- Favorite skills
- See history
- Track generated outputs
- Reopen previous generation sessions

## 8. Trust Layer Requirements

This is new in v1.1 and should be treated as a product requirement, not a nice-to-have.

For every indexed skill, the system should eventually support:

- Provenance badge: official, maintainer-owned, community, unknown
- Risk badge: low, medium, high, not scanned
- Freshness badge: active, aging, stale
- License badge
- Transparency panel explaining score inputs

## 9. Success Metrics

### Discovery metrics

- Indexed skills count
- Search success rate
- CTR from list to detail
- Save rate

### Creation metrics

- Generation start rate
- Generation completion rate
- Publish rate
- Iteration count before publish

### Quality metrics

- Duplicate rate
- Classification correction rate
- Broken install report rate
- User trust score on ranking pages

## 10. Recommended Data Model

### Core entities

- `source`
- `repository`
- `skill`
- `skill_version`
- `skill_file`
- `classification`
- `ranking_snapshot`
- `user`
- `favorite`
- `generation_session`
- `generated_skill`
- `token_config`
- `github_publish_job`

### Key design decision

`skill` is the stable identity. `skill_version` is the time-aware snapshot. This enables trend tracking, freshness, and diffing.

## 11. Suggested Architecture

### Frontend

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- Zustand
- Monaco Editor

### Backend

- Next.js route handlers or server actions for the web app layer
- Background worker for crawling, enrichment, and scoring
- Prisma ORM
- PostgreSQL for production
- SQLite for local prototyping only
- Redis for cache, queues, and leaderboard snapshots

### Jobs

- Scheduled crawler
- Classification worker
- Ranking snapshot worker
- GitHub publish worker

## 12. Crawler Strategy

### MVP

GitHub-first.

Primary search seeds:

- `SKILL.md`
- `.cursorrules`
- `AGENTS.md`
- known marketplace repos
- official example repos

### Crawl frequency

- Tier A sources: hourly
- Tier B sources: every 6 hours
- Tier C sources: daily

This replaces the earlier blanket "every hour for the whole web" assumption.

## 13. Ranking Formula v0

Use a transparent normalized score:

- 35% repository popularity
- 20% recent maintenance
- 15% discussion signal
- 10% freshness
- 10% platform engagement
- 10% quality/trust signals

The UI should expose the factors, even if the exact numeric weights stay internal.

## 14. Security And Compliance

### Token handling

- Encrypt with AES-256 or equivalent
- Keep encryption key separate from database
- Audit access to decrypted token usage

### Repository safety

- Never execute imported skill scripts during ingestion
- Parse only
- Add risk scanning and capability extraction before install or publish suggestions

### Data source compliance

- Respect GitHub API limits and terms
- Prefer official APIs over raw scraping when available
- Keep crawl logs and source references

## 15. UX Principles

1. Search first
2. Trust visible by default
3. Ranking is explainable
4. Generation feels iterative, not opaque
5. Publishing is one guided path, not many branching forms

## 16. Milestones

| Milestone | Time | Scope |
| --- | --- | --- |
| v0.1 MVP | Weeks 1-3 | Discovery, GitHub ingestion, classification v0, overall/new/rising rankings |
| v0.5 Alpha | Weeks 4-6 | AI studio, token settings, GitHub auth, favorites, history |
| v0.8 Beta | Weeks 7-9 | GitHub publish, trust badges, creator ranking, manual submission |
| v1.0 Launch | Weeks 10-12 | Stabilization, analytics, deployment hardening, bilingual polish |

## 17. Resolved Product Decisions

| Question | Decision |
| --- | --- |
| Crawl frequency | Tiered frequency, not one rule for all sources |
| Data source strategy | GitHub-first, docs and public catalogs as secondary |
| Free generation credits | No platform-subsidized credits in MVP; user-provided tokens only |
| User submissions | Yes, include manual submission early |
| Private skills | Deferred; design for it but do not ship in MVP |
| GitHub publish target | Create new repository first, existing repository sync later |
| Internationalization | Chinese and English planned, Chinese-first MVP copy acceptable |

## 18. Open Questions

1. Whether private team spaces are needed before public launch
2. Whether ranking should include install telemetry in MVP or later
3. Whether the platform should ship a public API in v1
4. Whether risk scanning should be built in-house first or integrated from an existing scanner

