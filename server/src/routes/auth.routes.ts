import { Router } from "express";

import { register } from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { registerSchema } from "../validations/auth.validation.js";
import { login , getMe} from "../controllers/auth.controller.js";
import { loginSchema } from "../validations/auth.validation.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  register
);
router.post(
  "/login",
  validate(loginSchema),
  login
);

router.get("/me", authMiddleware, getMe);

export default router;