import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError.js";
import { Role } from "@prisma/client";

const authorize =
  (...roles: Role[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized"));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
          "You don't have permission to perform this action."
        )
      );
    }

    next();
  };

export default authorize;