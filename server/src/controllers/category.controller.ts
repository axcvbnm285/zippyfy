import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import categoryService from "../services/category.service.js";

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, imageUrl } = req.body;
    const category = await categoryService.create(name, imageUrl);
    return res.status(201).json(new ApiResponse("Category created successfully", category));
  }
);

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const category = await categoryService.update(String(req.params.id), req.body);
    return res.status(200).json(new ApiResponse("Category updated successfully", category));
  }
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    await categoryService.delete(String(req.params.id));
    return res.status(200).json(new ApiResponse("Category deleted successfully", null));
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