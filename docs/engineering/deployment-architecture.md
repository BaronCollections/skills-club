# Deployment Architecture

Last updated: 2026-03-13

## Deployment Goal

Ship AI Skills Hub in a way that supports:

- Web discovery traffic
- Background crawling and ranking jobs
- AI generation requests using user-configured tokens
- GitHub publishing workflows

## Recommended Environments

- `local`: SQLite or local Postgres, mock or local Redis, manual jobs
- `staging`: managed Postgres, managed Redis, real GitHub OAuth, limited crawl scope
- `production`: managed Postgres, managed Redis, isolated worker processes, object storage for artifacts and logs

## Recommended Production Topology

### Web tier

- Next.js app
- Server-rendered route handlers for SEO pages
- API endpoints for authenticated user actions

### Data tier

- PostgreSQL for source-of-truth relational data
- Redis for caching, queue state, and leaderboard snapshots

### Worker tier

- Dedicated background worker for:
  - crawling
  - normalization
  - classification
  - ranking snapshots
  - GitHub publish jobs

### Storage tier

- Object storage for logs, exported artifacts, screenshots, and large scan reports

## Starter Architecture For First Deployment

If speed matters more than scale, deploy this first:

1. One Next.js app server
2. One Postgres instance
3. One Redis instance
4. One worker process
5. One scheduler or cron trigger

This is sufficient for the first internal or alpha release.

## Scale-out Architecture For Later

When ingestion volume grows:

1. Separate web and worker deployments
2. Use queue-based job dispatch
3. Split crawlers by source family
4. Precompute ranking snapshots
5. Add read replicas or caching for heavy browse traffic

## Suggested Service Providers

This can run on multiple stacks. Viable choices:

- Vercel + Neon/Supabase + Upstash + external worker host
- Railway + Postgres + Redis
- Self-managed VPS with Docker Compose for early-stage cost control
- Kubernetes only after job volume or team size justifies it

## Secret Management

Store separately:

- GitHub OAuth secrets
- database credentials
- Redis credentials
- encryption key for token storage

Rules:

- Never store encryption keys in the same database as encrypted token payloads
- Rotate provider secrets independently
- Use environment-based secret injection

## Background Job Recommendations

### Schedules

- Source crawl tier A: hourly
- Source crawl tier B: every 6 hours
- Ranking snapshot: hourly
- Stale-skill refresh: daily

### Queue topics

- `crawl.github`
- `crawl.docs`
- `normalize.skill`
- `classify.skill`
- `rank.snapshot`
- `publish.github`

## Monitoring

Minimum monitoring set:

- web error tracking
- API latency
- job success/failure counts
- crawl source freshness
- publish job outcomes

Useful additions:

- route-level analytics
- generation completion funnel
- ranking interaction metrics

## Deployment Checklist

### Before staging

- Environment variables documented
- OAuth callback URLs configured
- database migrations reviewed
- cron and worker boot commands confirmed

### Before production

- Backups enabled
- log retention policy defined
- encryption key rotation process documented
- crawl limits configured
- failure alerting configured

## Infrastructure Notes For This Project

- Use PostgreSQL in production; do not keep SQLite beyond local prototyping.
- Keep crawling and publishing out of the web request path.
- Preserve SEO for discovery and detail pages by server-rendering or pre-rendering public content where useful.
- Keep token use auditable because generation and publishing are high-sensitivity operations.

