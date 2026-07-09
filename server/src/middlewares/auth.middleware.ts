import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import ApiError from "../utils/ApiError.js";
import userRepository from "../repositories/user.repository.js";

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new ApiError(401, "Unauthorized"));
  }

  if (!authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "Invalid token"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    const user = await userRepository.findById(decoded.id);

    if (!user) {
      return next(new ApiError(401, "User not found"));
    }

    const { password, ...safeUser } = user;

    req.user = safeUser;

    next();
  } catch (error) {
    return next(new ApiError(401, "Invalid or expired token"));
  }
};

export default authMiddleware;