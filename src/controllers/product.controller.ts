import { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import productService from "../services/product.service.js";

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await productService.create({
      ...req.body,
      userId: req.user?.id,
    });

    return res.status(201).json(
      new ApiResponse(
        "Product created successfully",
        product
      )
    );
  }
);

export const getProducts = asyncHandler(
  async (_req: Request, res: Response) => {
    const products = await productService.getAll();

    return res.status(200).json(
      new ApiResponse(
        "Products fetched successfully",
        products
      )
    );
  }
);