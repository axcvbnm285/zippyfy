import { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import productService from "../services/product.service.js";

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await productService.create(
      req.body,
      req.user
    );

    return res.status(201).json(
      new ApiResponse(
        "Product created successfully",
        product
      )
    );
  }
);

export const getProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const products = await productService.getAll(
      page,
      limit
    );

    return res.status(200).json(
      new ApiResponse(
        "Products fetched successfully",
        products
      )
    );
  }
);

export const getProductBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await productService.getBySlug(
      req.params.slug as string
    );

    return res.status(200).json(
      new ApiResponse(
        "Product fetched successfully",
        product
      )
    );
  }
);

export const getFeaturedProducts = asyncHandler(
  async (_req: Request, res: Response) => {
    const products =
      await productService.getFeatured();

    return res.status(200).json(
      new ApiResponse(
        "Featured products fetched successfully",
        products
      )
    );
  }
);

export const getProductsByCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const products =
      await productService.getByCategory(
        req.params.categoryId as string
      );

    return res.status(200).json(
      new ApiResponse(
        "Products fetched successfully",
        products
      )
    );
  }
);