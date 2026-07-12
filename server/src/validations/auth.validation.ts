import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name should be at least 3 characters"),

  email: z
    .string()
    .trim()
    .email("Invalid email"),

  password: z
    .string()
    .min(8, "Password should be at least 8 characters"),
});

export const storeRegisterSchema = z.object({
  name: z.string().trim().min(3, "Name should be at least 3 characters"),
  email: z.string().trim().email("Invalid email"),
  password: z.string().min(8, "Password should be at least 8 characters"),
  storeName: z.string().trim().min(2, "Store name is required"),
  storeAddress: z.string().trim().min(5, "Store address is required"),
  storePhone: z.string().trim().min(7, "Store phone is required"),
  openTime: z.string().trim().min(1, "Opening time is required"),
  closeTime: z.string().trim().min(1, "Closing time is required"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email"),

  password: z
    .string()
    .min(8, "Password should be at least 8 characters"),
});