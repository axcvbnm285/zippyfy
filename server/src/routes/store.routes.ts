import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import { Role } from "@prisma/client";

import { createStore, getMyStore, getPublicStore } from "../controllers/store.controller.js";
import { createStoreSchema } from "../validations/store.validation.js";

const router = Router();

router.get("/public", getPublicStore);
router.post("/", authMiddleware, authorize(Role.STORE_OWNER, Role.ADMIN), validate(createStoreSchema), createStore);
router.get("/me", authMiddleware, authorize(Role.STORE_OWNER, Role.ADMIN), getMyStore);

export default router;