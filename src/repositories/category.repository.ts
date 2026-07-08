import prisma from "../prisma/client.js";

class CategoryRepository {
  async create(data: {
    name: string;
    slug: string;
    imageUrl?: string;
  }) {
    return prisma.category.create({
      data,
    });
  }

  async findAll() {
    return prisma.category.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.category.findUnique({
      where: {
        slug,
      },
    });
  }

  async findByName(name: string) {
    return prisma.category.findUnique({
      where: {
        name,
      },
    });
  }

  async findById(id: string) {
    return prisma.category.findUnique({
      where: { id },
    });
  }
}

export default new CategoryRepository();