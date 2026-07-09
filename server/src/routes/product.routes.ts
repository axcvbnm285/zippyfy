import { Router } from "express";

import { Role } from "@prisma/client";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  createProduct,
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  getProductsByCategory,
} from "../controllers/product.controller.js";

import {
  createProductSchema,
} from "../validations/product.validation.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  authorize(Role.STORE_OWNER, Role.ADMIN),
  validate(createProductSchema),
  createProduct
);

router.get("/", getProducts);

router.get("/featured", getFeaturedProducts);

router.get("/category/:categoryId", getProductsByCategory);

router.get("/:slug", getProductBySlug);

export default router;