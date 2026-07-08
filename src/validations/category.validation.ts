import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name is required"),

  imageUrl: z
    .string()
    .url("Invalid image URL")
    .optional(),
});