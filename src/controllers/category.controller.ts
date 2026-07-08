import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import categoryService from "../services/category.service.js";

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, imageUrl } = req.body;

    const category =
      categoryService.create(
    name,
    imageUrl
);

    return res.status(201).json(
      new ApiResponse(
        "Category created successfully",
        category
      )
    );
  }
);

export const getAllCategories = asyncHandler(
  async (_req: Request, res: Response) => {
    const categories =
      await categoryService.getAll();

    return res.status(200).json(
      new ApiResponse(
        "Categories fetched successfully",
        categories
      )
    );
  }
);