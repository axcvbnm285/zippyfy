import { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import authService from "../services/auth.service.js";

export const register = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const result =
      await authService.register(
        name,
        email,
        password
      );

    return res.status(201).json(
      new ApiResponse(
        "User registered successfully",
        result
      )
    );
  }
);
export const login = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result =
      await authService.login(
        email,
        password
      );

    return res.status(200).json(
      new ApiResponse(
        "Login successful",
        result
      )
    );
  }
);

export const getMe = asyncHandler(
  async (req: Request, res: Response) => {
    return res.status(200).json(
      new ApiResponse(
        "Profile fetched successfully",
        req.user
      )
    );
  }
);