import ApiError from "../utils/ApiError.js";
import { generateSlug } from "../utils/slugify.js";

import productRepository from "../repositories/product.repository.js";

class ProductService {

  async create(data: any) {

    const slug = generateSlug(data.name);

    const existing =
      await productRepository.findBySlug(slug);

    if (existing) {

      throw new ApiError(
        409,
        "Product already exists"
      );

    }

    return productRepository.create({

      ...data,

      slug,

    });

  }

  async getAll() {

    return productRepository.findAll();

  }

}

export default new ProductService();