import { Router } from "express";
import { Role } from "@prisma/client";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  placeOrder,
  getMyOrders,
  getOrderById,
  getStoreOrders,
  updateOrderStatus,
  verifyPickup,
} from "../controllers/order.controller.js";
import {
  placeOrderSchema,
  updateOrderStatusSchema,
  verifyPickupSchema,
} from "../validations/order.validation.js";

const router = Router();

// Customer — place order
router.post(
  "/",
  authMiddleware,
  authorize(Role.CUSTOMER),
  validate(placeOrderSchema),
  placeOrder
);

// Customer — get their own orders
router.get(
  "/my",
  authMiddleware,
  authorize(Role.CUSTOMER),
  getMyOrders
);

// Store owner — get all orders for their store (optional ?status= filter)
router.get(
  "/store",
  authMiddleware,
  authorize(Role.STORE_OWNER, Role.ADMIN),
  getStoreOrders
);

// Store owner — verify pickup code and mark collected
router.post(
  "/verify-pickup",
  authMiddleware,
  authorize(Role.STORE_OWNER, Role.ADMIN),
  validate(verifyPickupSchema),
  verifyPickup
);

// Shared — get single order by ID
router.get(
  "/:id",
  authMiddleware,
  getOrderById
);

// Store owner — update order status
router.patch(
  "/:id/status",
  authMiddleware,
  authorize(Role.STORE_OWNER, Role.ADMIN),
  validate(updateOrderStatusSchema),
  updateOrderStatus
);

export default router;
