import prisma from "../prisma/client.js";

class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        store: true,
      },
    });
  }

  async createUser(data: {
    name: string;
    email: string;
    password: string;
    role?: "CUSTOMER" | "STORE_OWNER" | "ADMIN" | "DELIVERY";
  }) {
    return prisma.user.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        store: true,
      },
    });
  }
}

export default new UserRepository();