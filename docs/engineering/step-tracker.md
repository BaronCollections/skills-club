# Step Tracker

Last updated: 2026-03-13

## Working Rule

Before each implementation step:

1. Record what was completed in the previous step
2. Record what the next step will build
3. Define validation criteria
4. Update status after verification

## Step 01

### Previous progress summary

Initial project bootstrapping completed:

- competitor research completed
- PRD upgraded to v1.1
- backlog and deployment docs created
- local nested git repository initialized
- remote set to `https://github.com/BaronCollections/skills-club.git`
- Next.js web app scaffolded in `apps/web`
- first-pass product shell and pages implemented
- `npm run lint` passed
- `npm run build` passed

### Next step objective

Build the data foundation for MVP discovery:

- add Prisma
- define the initial data schema
- add local seed data
- create a GitHub-first crawler contract and normalization types

### Validation target

- Prisma schema is present and coherent with the PRD
- local seed command is available
- crawler contract code exists and compiles
- project lint and build remain green

### Status

Completed

### Outcome

- Prisma data model added for repositories, skills, versions, classifications, ranking snapshots, users, favorites, and ingestion runs
- shared seed catalog added and reused by the UI mock layer
- GitHub-first crawler contract and normalization heuristics added
- local SQLite bootstrap SQL added
- local seed flow verified against `/tmp/skills-club-dev.db`
- `npm run db:seed` passed
- `npm run lint` passed
- `npm run build` passed

### Implementation note

`prisma db push` remains unreliable in the current local environment because the Prisma schema engine fails during database connection/bootstrap. The repository now includes a stable local fallback:

1. `npm run db:bootstrap`
2. `npm run db:generate`
3. `npm run db:seed`

This keeps the schema, generated client, and local database usable while avoiding the blocked schema-engine path.

## Step 02

### Previous progress summary

The data foundation now exists and has been verified locally:

- Prisma schema defined
- SQLite bootstrap path working
- seed flow working
- crawler contract defined
- build still green

### Next step objective

Wire the application pages to real repository queries:

- add Prisma-backed read services
- fetch discovery cards from the seeded database
- fetch ranking rows from ranking snapshots
- fetch skill detail pages from real records instead of static mock arrays
- keep current UI shape but replace the in-memory source

### Validation target

- homepage reads from the database
- rankings page reads from the database
- skill detail pages read from the database
- seed + lint + build remain green

### Status

Completed

### Outcome

- added Prisma-backed read helpers with fallback behavior
- homepage now reads featured skills and ranking snapshot data from the database when available
- rankings page now reads ranking snapshots from the database when available
- skill detail pages now read skill records from the database when available
- static fallback behavior remains in place for environments without seeded data
- `npm run db:seed` passed
- `npm run lint` passed
- `npm run build` passed

## Step 03

### Previous progress summary

The main browse surfaces now have a working database-backed read path:

- data schema exists
- local seed exists
- homepage reads from Prisma
- rankings read from Prisma
- detail pages read from Prisma

### Next step objective

Build the first real discovery service layer:

- add search and filter query helpers
- expose route handlers for discovery and rankings data
- prepare the app to switch from seeded data to ingested records without changing page contracts
- connect crawler normalization output to persistence-ready DTOs

### Validation target

- discovery API route returns seeded skills with filters
- ranking API route returns seeded snapshots
- app build remains green
- seed flow remains green

### Status

Pending

## Step 04

### Previous progress summary

The repository now has:

- planning documents
- product shell
- data schema
- local database seed flow
- Prisma-backed discovery reads
- green lint and build

No git commit exists yet, so the next version marker should capture the first complete baseline.

### Next step objective

Create a recoverable repository snapshot named `version_0313` so future work can continue from a stable baseline.

### Validation target

- current worktree is committed
- git tag `version_0313` exists
- tag resolves to the expected baseline commit

### Status

Completed

### Outcome

- created the first project baseline commit
- merged the remote repository's initial history into local `main`
- moved `version_0313` to the merged baseline commit
- pushed `main` to GitHub
- pushed `version_0313` to GitHub

### Result

- baseline tag: `version_0313`
- pushed branch: `main`
