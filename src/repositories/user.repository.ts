import prisma from "../prisma/client.js";

class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(data: {
    name: string;
    email: string;
    password: string;
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
  });
}
}

export default new UserRepository();