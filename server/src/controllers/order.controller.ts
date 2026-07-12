import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import orderService from "../services/order.service.js";
import { OrderStatus } from "@prisma/client";

export const placeOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await orderService.placeOrder({
    ...req.body,
    customerId: req.user!.id as string,
  });

  return res.status(201).json(new ApiResponse("Order placed successfully", order));
});

export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await orderService.getMyOrders(req.user!.id as string);

  return res.status(200).json(new ApiResponse("Orders fetched successfully", orders));
});

export const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const order = await orderService.getOrderById(
    String(req.params.id),
    req.user!.id as string,
    req.user!.role as string
  );

  return res.status(200).json(new ApiResponse("Order fetched successfully", order));
});

export const getStoreOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await orderService.getStoreOrders(
    req.user!.store.id as string,
    typeof req.query.status === "string" ? req.query.status : undefined
  );

  return res.status(200).json(new ApiResponse("Store orders fetched successfully", orders));
});

export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
  const order = await orderService.updateStatus(
    String(req.params.id),
    req.body.status as OrderStatus,
    req.user!.store.id as string
  );

  return res.status(200).json(new ApiResponse("Order status updated successfully", order));
});

export const verifyPickup = asyncHandler(async (req: Request, res: Response) => {
  const order = await orderService.verifyPickup(
    req.body.pickupCode as string,
    req.user!.store.id as string
  );

  return res.status(200).json(new ApiResponse("Pickup verified. Order marked as collected.", order));
});
