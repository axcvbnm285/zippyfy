import { OrderStatus } from "@prisma/client";
import ApiError from "../utils/ApiError.js";
import orderRepository from "../repositories/order.repository.js";
import productRepository from "../repositories/product.repository.js";
import prisma from "../prisma/client.js";

const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  NEW:       [OrderStatus.PACKING, OrderStatus.REJECTED],
  PACKING:   [OrderStatus.READY],
  READY:     [OrderStatus.COLLECTED],
  COLLECTED: [],
  REJECTED:  [],
};

function generatePickupCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

class OrderService {
  async placeOrder(data: {
    customerId: string;
    storeId: string;
    paymentMethod: "CASH_ON_PICKUP" | "ONLINE";
    note?: string;
    items: { productId: string; qty: number }[];
  }) {
    const storeById = await prisma.store.findUnique({ where: { id: data.storeId } });

    if (!storeById || !storeById.isActive) {
      throw new ApiError(404, "Store not found or inactive.");
    }

    if (data.items.length === 0) {
      throw new ApiError(400, "Order must have at least one item.");
    }

    let total = 0;
    const resolvedItems = [];

    for (const item of data.items) {
      if (item.qty < 1) {
        throw new ApiError(400, `Invalid quantity for product ${item.productId}.`);
      }

      const product = await productRepository.findById(item.productId);

      if (!product) {
        throw new ApiError(404, `Product ${item.productId} not found.`);
      }

      if (!product.isActive) {
        throw new ApiError(400, `Product "${product.name}" is no longer available.`);
      }

      if (product.stock < item.qty) {
        throw new ApiError(400, `Insufficient stock for "${product.name}". Available: ${product.stock}.`);
      }

      total += product.sellingPrice * item.qty;

      resolvedItems.push({
        productId: product.id,
        name: product.name,
        imageUrl: product.imageUrl ?? undefined,
        unit: product.unit,
        qty: item.qty,
        price: product.sellingPrice,
      });
    }

    const order = await orderRepository.create({
      customerId: data.customerId,
      storeId: data.storeId,
      total: Math.round(total * 100) / 100,
      paymentMethod: data.paymentMethod,
      note: data.note,
      items: resolvedItems,
    });

    return order;
  }

  async getMyOrders(customerId: string) {
    return orderRepository.findByCustomer(customerId);
  }

  async getOrderById(id: string, requesterId: string, requesterRole: string) {
    const order = await orderRepository.findById(id);

    if (!order) {
      throw new ApiError(404, "Order not found.");
    }

    const isCustomer = requesterRole === "CUSTOMER" && order.customerId === requesterId;
    const isStoreOwner = requesterRole === "STORE_OWNER" && order.store.id === requesterId;
    const isAdmin = requesterRole === "ADMIN";

    if (!isCustomer && !isStoreOwner && !isAdmin) {
      throw new ApiError(403, "Access denied.");
    }

    return order;
  }

  async getStoreOrders(storeId: string, status?: string) {
    const validStatus = status && Object.values(OrderStatus).includes(status as OrderStatus)
      ? (status as OrderStatus)
      : undefined;

    return orderRepository.findByStore(storeId, validStatus);
  }

  async updateStatus(orderId: string, newStatus: OrderStatus, storeOwnerId: string) {
    const order = await orderRepository.findById(orderId);

    if (!order) {
      throw new ApiError(404, "Order not found.");
    }

    if (order.store.id !== storeOwnerId) {
      throw new ApiError(403, "You can only update orders for your own store.");
    }

    const allowed = VALID_TRANSITIONS[order.status];

    if (!allowed.includes(newStatus)) {
      throw new ApiError(
        400,
        `Cannot transition from ${order.status} to ${newStatus}. Allowed: ${allowed.join(", ") || "none"}.`
      );
    }

    const now = new Date();
    const extra: Record<string, any> = {};

    if (newStatus === OrderStatus.PACKING)   extra.acceptedAt = now;
    if (newStatus === OrderStatus.READY)     { extra.readyAt = now; extra.pickupCode = generatePickupCode(); }
    if (newStatus === OrderStatus.COLLECTED) extra.collectedAt = now;
    if (newStatus === OrderStatus.REJECTED)  extra.rejectedAt = now;

    return orderRepository.updateStatus(orderId, newStatus, extra);
  }

  async verifyPickup(pickupCode: string, storeOwnerId: string) {
    const order = await orderRepository.findByPickupCode(pickupCode.toUpperCase());

    if (!order) {
      throw new ApiError(404, "No order found with this pickup code.");
    }

    if (order.store.id !== storeOwnerId) {
      throw new ApiError(403, "This order does not belong to your store.");
    }

    if (order.status !== OrderStatus.READY) {
      throw new ApiError(400, `Order is not ready for pickup. Current status: ${order.status}.`);
    }

    return orderRepository.updateStatus(order.id, OrderStatus.COLLECTED, {
      collectedAt: new Date(),
    });
  }
}

export default new OrderService();
