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

  async findBySlug(slug: string) {

    return prisma.product.findUnique({
      where: {
        slug,
      },
    });

  }

  async findAll() {

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

}

export default new ProductRepository();