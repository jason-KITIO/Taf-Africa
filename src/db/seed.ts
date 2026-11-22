import { db } from "./index";
import { categories, plans, skills } from "./schema";

const skillNames = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Laravel",
  "WordPress",
  "UI Design",
  "UX Research",
  "Figma",
  "Motion Design",
  "Vidéo",
  "SEO",
  "Marketing digital",
  "Data",
  "IA",
];

async function main() {
  await db
    .insert(plans)
    .values([
      {
        code: "free",
        name: "Membre gratuit",
        priceCents: 0,
        priceXaf: 0,
        monthlyCredits: 0,
        canSeeClient: false,
        sortOrder: 0,
      },
      {
        code: "pro",
        name: "Pro",
        priceCents: 3190,
        priceXaf: 21000,
        monthlyCredits: 80,
        canSeeClient: true,
        sortOrder: 1,
      },
      {
        code: "pro_max",
        name: "Pro Max",
        priceCents: 5990,
        priceXaf: 39300,
        monthlyCredits: 200,
        canSeeClient: true,
        isFeatured: true,
        sortOrder: 2,
      },
      {
        code: "agence",
        name: "Agence",
        priceCents: 10990,
        priceXaf: 72100,
        monthlyCredits: 400,
        canSeeClient: true,
        sortOrder: 3,
      },
    ])
    .onConflictDoNothing({ target: plans.code });

  const parents = await db
    .insert(categories)
    .values([
      { name: "Développement", slug: "developpement", sortOrder: 1 },
      { name: "Design", slug: "design", sortOrder: 2 },
      { name: "Vidéo et motion", slug: "video-motion", sortOrder: 3 },
      { name: "Marketing", slug: "marketing", sortOrder: 4 },
    ])
    .onConflictDoNothing({ target: categories.slug })
    .returning();

  const bySlug = Object.fromEntries(parents.map((item) => [item.slug, item.id]));

  const children = [
    { parent: "developpement", name: "Front-end", slug: "front-end" },
    { parent: "developpement", name: "Back-end", slug: "back-end" },
    { parent: "developpement", name: "Fullstack", slug: "fullstack" },
    { parent: "developpement", name: "Mobile", slug: "mobile" },
    { parent: "developpement", name: "WordPress / no-code", slug: "wordpress-no-code" },
    { parent: "design", name: "UI/UX", slug: "ui-ux" },
    { parent: "design", name: "Logo et identité", slug: "logo-identite" },
    { parent: "video-motion", name: "Motion design", slug: "motion-design" },
    { parent: "marketing", name: "SEO", slug: "seo" },
    { parent: "marketing", name: "Social ads", slug: "social-ads" },
  ];

  await db
    .insert(categories)
    .values(
      children.map((item) => ({
        parentId: bySlug[item.parent],
        name: item.name,
        slug: item.slug,
      })),
    )
    .onConflictDoNothing({ target: categories.slug });

  await db
    .insert(skills)
    .values(
      skillNames.map((name) => ({
        name,
        slug: name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      })),
    )
    .onConflictDoNothing({ target: skills.name });

  console.log("Seed terminé");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .then(() => process.exit(0));
