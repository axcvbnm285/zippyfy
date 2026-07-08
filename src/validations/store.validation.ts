import { z } from "zod";

export const createStoreSchema = z.object({
  name: z.string().min(2),

  address: z.string().min(5),

  phone: z.string().min(8),

  imageUrl: z.string().url().optional(),
});