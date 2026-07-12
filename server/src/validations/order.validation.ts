import { z } from "zod";
import { OrderStatus } from "@prisma/client";

export const placeOrderSchema = z.object({
  storeId: z.string().min(1, "Store ID is required"),

  paymentMethod: z.enum(["CASH_ON_PICKUP", "ONLINE"]).default("CASH_ON_PICKUP"),

  note: z.string().max(300).optional(),

  items: z
    .array(
      z.object({
        productId: z.string().min(1, "Product ID is required"),
        qty: z.number().int().min(1, "Quantity must be at least 1"),
      })
    )
    .min(1, "Order must have at least one item"),
});

export const updateOrderStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus),
});

export const verifyPickupSchema = z.object({
  pickupCode: z.string().min(1, "Pickup code is required").toUpperCase(),
});
