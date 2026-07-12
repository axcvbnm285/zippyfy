import prisma from "../prisma/client.js";

class StoreRepository {
  async create(data: {
    name: string;
    slug: string;
    address: string;
    phone: string;
    imageUrl?: string;
    openTime?: string;
    closeTime?: string;
    ownerId: string;
  }) {
    return prisma.store.create({
      data,
    });
  }

  async findFirst() {
    return prisma.store.findFirst({ where: { isActive: true } });
  }

  async findByOwnerId(ownerId: string) {
    return prisma.store.findUnique({
      where: {
        ownerId,
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.store.findUnique({
      where: {
        slug,
      },
    });
  }

  async update(
    ownerId: string,
    data: {
      name?: string;
      address?: string;
      phone?: string;
      imageUrl?: string;
    }
  ) {
    return prisma.store.update({
      where: {
        ownerId,
      },
      data,
    });
  }
}

export default new StoreRepository();