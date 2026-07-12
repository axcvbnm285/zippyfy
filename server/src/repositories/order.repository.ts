import prisma from "../prisma/client.js";
import { OrderStatus } from "@prisma/client";

class OrderRepository {
  async create(data: {
    customerId: string;
    storeId: string;
    total: number;
    paymentMethod: "CASH_ON_PICKUP" | "ONLINE";
    note?: string;
    items: {
      productId: string;
      name: string;
      imageUrl?: string;
      unit: string;
      qty: number;
      price: number;
    }[];
  }) {
    return prisma.order.create({
      data: {
        customerId: data.customerId,
        storeId: data.storeId,
        total: data.total,
        paymentMethod: data.paymentMethod,
        note: data.note,
        items: {
          create: data.items,
        },
      },
      include: {
        items: true,
        customer: { select: { id: true, name: true, phone: true, email: true } },
        store: { select: { id: true, name: true, address: true } },
      },
    });
  }

  async findById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { product: { select: { id: true, name: true, imageUrl: true } } } },
        customer: { select: { id: true, name: true, phone: true, email: true } },
        store: { select: { id: true, name: true, address: true } },
      },
    });
  }

  async findByCustomer(customerId: string) {
    return prisma.order.findMany({
      where: { customerId },
      include: {
        items: true,
        store: { select: { id: true, name: true, address: true } },
      },
      orderBy: { placedAt: "desc" },
    });
  }

  async findByStore(storeId: string, status?: OrderStatus) {
    return prisma.order.findMany({
      where: {
        storeId,
        ...(status ? { status } : {}),
      },
      include: {
        items: true,
        customer: { select: { id: true, name: true, phone: true, email: true } },
      },
      orderBy: { placedAt: "desc" },
    });
  }

  async updateStatus(id: string, status: OrderStatus, extra?: Partial<{
    pickupCode: string;
    acceptedAt: Date;
    readyAt: Date;
    collectedAt: Date;
    rejectedAt: Date;
  }>) {
    return prisma.order.update({
      where: { id },
      data: { status, ...extra },
      include: {
        items: true,
        customer: { select: { id: true, name: true, phone: true, email: true } },
        store: { select: { id: true, name: true, address: true } },
      },
    });
  }

  async findByPickupCode(pickupCode: string) {
    return prisma.order.findUnique({
      where: { pickupCode },
      include: {
        items: true,
        customer: { select: { id: true, name: true, phone: true, email: true } },
        store: { select: { id: true, name: true, address: true } },
      },
    });
  }
}

export default new OrderRepository();
