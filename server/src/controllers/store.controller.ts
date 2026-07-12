import { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import storeService from "../services/store.service.js";

export const createStore = asyncHandler(
  async (req: Request, res: Response) => {
    const store = await storeService.create(
      req.body,
      req.user!.id
    );

    return res.status(201).json(
      new ApiResponse(
        "Store created successfully",
        store
      )
    );
  }
);

export const getPublicStore = asyncHandler(
  async (_req: Request, res: Response) => {
    const store = await storeService.getPublicStore();
    return res.status(200).json(new ApiResponse("Store fetched successfully", store));
  }
);

export const getMyStore = asyncHandler(
  async (req: Request, res: Response) => {
    const store =
      await storeService.getMyStore(req.user!.id);

    return res.status(200).json(
      new ApiResponse(
        "Store fetched successfully",
        store
      )
    );
  }
);