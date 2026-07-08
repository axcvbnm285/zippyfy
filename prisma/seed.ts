import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    "Fruits",
    "Vegetables",
    "Dairy",
    "Bakery",
    "Beverages",
    "Snacks",
    "Rice & Grains",
    "Personal Care",
    "Household",
    "Frozen Food",
    "Meat",
    "Fish",
    "Eggs",
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        slug: slugify(category, {
          lower: true,
          strict: true,
        }),
      },
      update: {},
      create: {
        name: category,
        slug: slugify(category, {
          lower: true,
          strict: true,
        }),
      },
    });
  }

  console.log("✅ Categories Seeded");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });