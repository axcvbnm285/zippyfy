import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2).max(100),

  description: z.string().optional(),

  imageUrl: z.string().url().optional(),

  brand: z.string().optional(),

  weight: z.string().optional(),

  sku: z.string().optional(),

  mrp: z.number().positive(),

  sellingPrice: z.number().positive(),

  stock: z.number().int().min(0),

  unit: z.string().min(1),

  categoryId: z.string().min(1),
});

export const updateProductSchema = createProductSchema.partial();