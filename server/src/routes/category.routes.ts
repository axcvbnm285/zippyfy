import { Router } from "express";
import { createCategory, getAllCategories, updateCategory, deleteCategory } from "../controllers/category.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { createCategorySchema } from "../validations/category.validation.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import { Role } from "@prisma/client";

const router = Router();

router.get("/", getAllCategories);
router.post("/", authMiddleware, authorize(Role.STORE_OWNER, Role.ADMIN), validate(createCategorySchema), createCategory);
router.patch("/:id", authMiddleware, authorize(Role.STORE_OWNER, Role.ADMIN), updateCategory);
router.delete("/:id", authMiddleware, authorize(Role.STORE_OWNER, Role.ADMIN), deleteCategory);

export default router;