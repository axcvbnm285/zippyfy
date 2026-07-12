import prisma from "../prisma/client.js";

class ProductRepository {
  async create(data: {
    name: string;
    slug: string;
    description?: string;
    imageUrl?: string;
    brand?: string;
    weight?: string;
    sku?: string;
    mrp: number;
    sellingPrice: number;
    stock: number;
    unit: string;
    categoryId: string;
    storeId: string;
  }) {
    return prisma.product.create({
      data,
      include: {
        category: true,
        store: true,
      },
    });
  }

  async findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        store: true,
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        store: true,
      },
    });
  }

  async findAll(skip = 0, take = 20) {
    return prisma.product.findMany({
      where: {
        isActive: true,
      },
      include: {
        category: true,
        store: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take,
    });
  }

  async findFeatured() {
    return prisma.product.findMany({
      where: {
        isFeatured: true,
        isActive: true,
      },
      include: {
        category: true,
        store: true,
      },
      take: 10,
    });
  }

  async findByCategory(categoryId: string) {
    return prisma.product.findMany({
      where: {
        categoryId,
        isActive: true,
      },
      include: {
        category: true,
        store: true,
      },
    });
  }

  async update(id: string, data: any) {
    return prisma.product.update({
      where: { id },
      data,
      include: {
        category: true,
        store: true,
      },
    });
  }

  async updateStock(id: string, stock: number) {
    return prisma.product.update({
      where: { id },
      data: {
        stock,
      },
    });
  }

  async deactivate(id: string) {
    return prisma.product.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }
  async findByStore(storeId: string) {
    return prisma.product.findMany({
      where: { storeId },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  }
}

export default new ProductRepository();