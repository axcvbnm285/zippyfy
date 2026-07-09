import ApiError from "../utils/ApiError.js";
import { generateSlug } from "../utils/slugify.js";

import storeRepository from "../repositories/store.repository.js";

class StoreService {
  async create(
    data: {
      name: string;
      address: string;
      phone: string;
      imageUrl?: string;
    },
    ownerId: string
  ) {
    const existingStore =
      await storeRepository.findByOwnerId(ownerId);

    if (existingStore) {
      throw new ApiError(
        409,
        "Store already exists for this user."
      );
    }

    const slug = generateSlug(data.name);

    return storeRepository.create({
      ...data,
      slug,
      ownerId,
    });
  }

  async getMyStore(ownerId: string) {
    const store =
      await storeRepository.findByOwnerId(ownerId);

    if (!store) {
      throw new ApiError(404, "Store not found.");
    }

    return store;
  }
}

export default new StoreService();