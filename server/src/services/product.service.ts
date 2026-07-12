import ApiError from "../utils/ApiError.js";
import productRepository from "../repositories/product.repository.js";
import categoryRepository from "../repositories/category.repository.js";
import { generateSlug } from "../utils/slugify.js";

class ProductService {
  async create(data: any, user: any) {
    if (!user.store) {
      throw new ApiError(403, "Store not found.");
    }

    const category = await categoryRepository.findById(
      data.categoryId
    );

    if (!category) {
      throw new ApiError(404, "Category not found.");
    }

    if (data.sellingPrice > data.mrp) {
      throw new ApiError(
        400,
        "Selling price cannot be greater than MRP."
      );
    }

    if (data.stock < 0) {
      throw new ApiError(
        400,
        "Stock cannot be negative."
      );
    }

    const slug = generateSlug(data.name);

    return productRepository.create({
      ...data,
      slug,
      storeId: user.store.id,
    });
  }

  async getAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    return productRepository.findAll(skip, limit);
  }

  async getBySlug(slug: string) {
    const product =
      await productRepository.findBySlug(slug);

    if (!product) {
      throw new ApiError(404, "Product not found.");
    }

    return product;
  }

  async getFeatured() {
    return productRepository.findFeatured();
  }

  async getByCategory(categoryId: string) {
    return productRepository.findByCategory(
      categoryId
    );
  }
  async update(id: string, data: any, user: any) {
    const product = await productRepository.findById(id);
    if (!product) throw new ApiError(404, "Product not found.");
    if (product.storeId !== user.store?.id) throw new ApiError(403, "Not your product.");
    return productRepository.update(id, data);
  }

  async delete(id: string, user: any) {
    const product = await productRepository.findById(id);
    if (!product) throw new ApiError(404, "Product not found.");
    if (product.storeId !== user.store?.id) throw new ApiError(403, "Not your product.");
    return productRepository.deactivate(id);
  }

  async getByStore(storeId: string) {
    return productRepository.findByStore(storeId);
  }
}

export default new ProductService();