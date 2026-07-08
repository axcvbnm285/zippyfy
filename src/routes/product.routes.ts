import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import { Role } from "@prisma/client";

import {
  createProduct,
  getProducts,
} from "../controllers/product.controller.js";

import { createProductSchema } from "../validations/product.validation.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  authorize(Role.STORE_OWNER, Role.ADMIN),
  validate(createProductSchema),
  createProduct
);

router.get("/", getProducts);

export default router;