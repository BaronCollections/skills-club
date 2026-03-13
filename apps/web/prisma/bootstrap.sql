CREATE TABLE "Repository" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "externalId" TEXT,
    "host" TEXT NOT NULL DEFAULT 'github',
    "fullName" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "defaultBranch" TEXT,
    "license" TEXT,
    "primaryLanguage" TEXT,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "forks" INTEGER NOT NULL DEFAULT 0,
    "watchers" INTEGER NOT NULL DEFAULT 0,
    "openIssues" INTEGER NOT NULL DEFAULT 0,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "lastCommitAt" DATETIME,
    "lastIndexedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

CREATE TABLE "Skill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "complexity" TEXT NOT NULL,
    "provenance" TEXT NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "sourceKind" TEXT NOT NULL DEFAULT 'github_repository',
    "sourcePath" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "installHint" TEXT,
    "ownerName" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "heatScore" REAL NOT NULL DEFAULT 0,
    "growthRate" REAL NOT NULL DEFAULT 0,
    "qualityScore" REAL NOT NULL DEFAULT 0,
    "lastIndexedAt" DATETIME NOT NULL,
    "lastVerifiedAt" DATETIME,
    "repositoryId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Skill_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "SkillVersion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "skillId" TEXT NOT NULL,
    "versionLabel" TEXT,
    "sourcePath" TEXT NOT NULL,
    "sourceSha" TEXT,
    "contentHash" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "extractedSummary" TEXT,
    "metadataJson" TEXT,
    "discoveredAt" DATETIME NOT NULL,
    "upstreamUpdatedAt" DATETIME,
    "isLatest" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SkillVersion_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "Classification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "skillId" TEXT NOT NULL,
    "dimension" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "confidence" REAL NOT NULL DEFAULT 1,
    "sourceMethod" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Classification_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "RankingSnapshot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "skillId" TEXT NOT NULL,
    "board" TEXT NOT NULL,
    "window" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "score" REAL NOT NULL,
    "trendPct" REAL,
    "recordedAt" DATETIME NOT NULL,
    "factorsJson" TEXT,
    CONSTRAINT "RankingSnapshot_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT,
    "githubId" TEXT,
    "githubLogin" TEXT,
    "name" TEXT,
    "imageUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Favorite_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "IngestionRun" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sourceKind" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "triggerMode" TEXT NOT NULL,
    "repositoryId" TEXT,
    "discoveredCount" INTEGER NOT NULL DEFAULT 0,
    "newSkillsCount" INTEGER NOT NULL DEFAULT 0,
    "updatedSkillsCount" INTEGER NOT NULL DEFAULT 0,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" DATETIME,
    "errorMessage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "IngestionRun_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "Repository_fullName_key" ON "Repository"("fullName");
CREATE UNIQUE INDEX "Repository_url_key" ON "Repository"("url");
CREATE INDEX "Repository_host_owner_name_idx" ON "Repository"("host", "owner", "name");

CREATE UNIQUE INDEX "Skill_slug_key" ON "Skill"("slug");
CREATE INDEX "Skill_platform_idx" ON "Skill"("platform");
CREATE INDEX "Skill_category_idx" ON "Skill"("category");
CREATE INDEX "Skill_domain_idx" ON "Skill"("domain");
CREATE INDEX "Skill_repositoryId_idx" ON "Skill"("repositoryId");
CREATE INDEX "Skill_heatScore_idx" ON "Skill"("heatScore");

CREATE INDEX "SkillVersion_skillId_isLatest_idx" ON "SkillVersion"("skillId", "isLatest");
CREATE UNIQUE INDEX "SkillVersion_skillId_contentHash_key" ON "SkillVersion"("skillId", "contentHash");

CREATE INDEX "Classification_dimension_value_idx" ON "Classification"("dimension", "value");
CREATE UNIQUE INDEX "Classification_skillId_dimension_value_key" ON "Classification"("skillId", "dimension", "value");

CREATE INDEX "RankingSnapshot_board_window_recordedAt_rank_idx" ON "RankingSnapshot"("board", "window", "recordedAt", "rank");
CREATE UNIQUE INDEX "RankingSnapshot_skillId_board_window_recordedAt_key" ON "RankingSnapshot"("skillId", "board", "window", "recordedAt");

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_githubId_key" ON "User"("githubId");
CREATE UNIQUE INDEX "User_githubLogin_key" ON "User"("githubLogin");

CREATE INDEX "Favorite_skillId_idx" ON "Favorite"("skillId");
CREATE UNIQUE INDEX "Favorite_userId_skillId_key" ON "Favorite"("userId", "skillId");

CREATE INDEX "IngestionRun_sourceKind_status_startedAt_idx" ON "IngestionRun"("sourceKind", "status", "startedAt");

