import { Router } from "express";

import {
  createCategory,
  getAllCategories,
} from "../controllers/category.controller.js";

import validate from "../middlewares/validate.middleware.js";

import { createCategorySchema } from "../validations/category.validation.js";

const router = Router();

router.post(
  "/",
  validate(createCategorySchema),
  createCategory
);

router.get(
  "/",
  getAllCategories
);

export default router;