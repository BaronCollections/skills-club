import "dotenv/config";
import { createHash } from "node:crypto";

import { PrismaClient } from "@prisma/client";

import { catalogSkills } from "../src/lib/catalog-data.ts";

const prisma = new PrismaClient();

function hashContent(content: string) {
  return createHash("sha256").update(content).digest("hex");
}

async function main() {
  await prisma.favorite.deleteMany();
  await prisma.rankingSnapshot.deleteMany();
  await prisma.classification.deleteMany();
  await prisma.skillVersion.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.ingestionRun.deleteMany();
  await prisma.repository.deleteMany();
  await prisma.user.deleteMany();

  const sampleUser = await prisma.user.create({
    data: {
      email: "owner@skills.club",
      githubId: "baroncollections-demo",
      githubLogin: "BaronCollections",
      name: "Skills Club Owner",
    },
  });

  const createdSkillIds: string[] = [];

  const risingOrder = [...catalogSkills]
    .sort((a, b) => b.growthPercent - a.growthPercent)
    .map((item) => item.slug);

  for (const [index, skillSeed] of catalogSkills.entries()) {
    const repository = await prisma.repository.create({
      data: {
        externalId: skillSeed.repositoryExternalId,
        host: "github",
        fullName: skillSeed.repositoryFullName,
        owner: skillSeed.repositoryOwner,
        name: skillSeed.repositoryName,
        url: skillSeed.repositoryUrl,
        description: skillSeed.repositoryDescription,
        defaultBranch: skillSeed.defaultBranch,
        license: skillSeed.license,
        primaryLanguage: skillSeed.primaryLanguage,
        stars: skillSeed.stars,
        forks: skillSeed.forks,
        watchers: skillSeed.watchers,
        openIssues: skillSeed.openIssues,
        lastCommitAt: new Date(skillSeed.updatedAt),
        lastIndexedAt: new Date(skillSeed.indexedAt),
      },
    });

    const skill = await prisma.skill.create({
      data: {
        slug: skillSeed.slug,
        name: skillSeed.name,
        summary: skillSeed.summary,
        platform: skillSeed.platform,
        category: skillSeed.category,
        domain: skillSeed.domain,
        complexity: skillSeed.complexity,
        provenance: skillSeed.provenance,
        riskLevel: skillSeed.riskLevel,
        sourceKind: "github_repository",
        sourcePath: skillSeed.sourcePath,
        sourceUrl: skillSeed.sourceUrl,
        installHint: skillSeed.installHint,
        ownerName: skillSeed.repositoryOwner,
        isFeatured: true,
        heatScore: skillSeed.heatScore,
        growthRate: skillSeed.growthPercent,
        qualityScore: skillSeed.qualityScore,
        lastIndexedAt: new Date(skillSeed.indexedAt),
        lastVerifiedAt: new Date(skillSeed.indexedAt),
        repositoryId: repository.id,
      },
    });

    createdSkillIds.push(skill.id);

    await prisma.skillVersion.create({
      data: {
        skillId: skill.id,
        versionLabel: skillSeed.versionLabel,
        sourcePath: skillSeed.sourcePath,
        sourceSha: skillSeed.sourceSha,
        contentHash: hashContent(skillSeed.content),
        content: skillSeed.content,
        extractedSummary: skillSeed.summary,
        metadataJson: JSON.stringify({
          repositoryUrl: skillSeed.repositoryUrl,
          installHint: skillSeed.installHint,
          contentLength: skillSeed.content.length,
        }),
        discoveredAt: new Date(skillSeed.indexedAt),
        upstreamUpdatedAt: new Date(skillSeed.updatedAt),
        isLatest: true,
      },
    });

    const classificationRows = [
      { dimension: "platform", value: skillSeed.platform, confidence: 0.98 },
      { dimension: "category", value: skillSeed.category, confidence: 0.96 },
      { dimension: "domain", value: skillSeed.domain, confidence: 0.92 },
      { dimension: "complexity", value: skillSeed.complexity, confidence: 0.95 },
      { dimension: "risk", value: skillSeed.riskLevel, confidence: 0.88 },
    ];

    await prisma.classification.createMany({
      data: classificationRows.map((row) => ({
        skillId: skill.id,
        dimension: row.dimension,
        value: row.value,
        confidence: row.confidence,
        sourceMethod: "seed",
      })),
    });

    await prisma.rankingSnapshot.createMany({
      data: [
        {
          skillId: skill.id,
          board: "overall",
          window: "weekly",
          rank: index + 1,
          score: skillSeed.heatScore,
          trendPct: skillSeed.growthPercent,
          recordedAt: new Date("2026-03-13T09:00:00.000Z"),
          factorsJson: JSON.stringify({
            popularity: skillSeed.stars,
            maintenance: skillSeed.watchers,
            freshness: skillSeed.updatedLabel,
          }),
        },
        {
          skillId: skill.id,
          board: "rising",
          window: "weekly",
          rank: risingOrder.indexOf(skillSeed.slug) + 1,
          score: skillSeed.growthPercent,
          trendPct: skillSeed.growthPercent,
          recordedAt: new Date("2026-03-13T09:00:00.000Z"),
          factorsJson: JSON.stringify({
            growthPercent: skillSeed.growthPercent,
            heatScore: skillSeed.heatScore,
          }),
        },
      ],
    });

    await prisma.ingestionRun.create({
      data: {
        sourceKind: "github_search",
        target: skillSeed.repositoryFullName,
        status: "completed",
        triggerMode: "manual_seed",
        repositoryId: repository.id,
        discoveredCount: 1,
        newSkillsCount: 1,
        updatedSkillsCount: 0,
        startedAt: new Date(skillSeed.indexedAt),
        finishedAt: new Date(skillSeed.indexedAt),
      },
    });
  }

  await prisma.favorite.createMany({
    data: createdSkillIds.slice(0, 3).map((skillId) => ({
      userId: sampleUser.id,
      skillId,
    })),
  });

  console.log(
    `Seeded ${catalogSkills.length} skills, ${catalogSkills.length} repositories, and 1 sample user.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

