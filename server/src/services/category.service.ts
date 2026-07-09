import ApiError from "../utils/ApiError.js";
import categoryRepository from "../repositories/category.repository.js";
import { generateSlug } from "../utils/slugify.js";

class CategoryService {
  async create(name: string, imageUrl: string) {
    const slug = generateSlug(name);

    const existingSlug =
      await categoryRepository.findBySlug(slug);

    if (existingSlug) {
      throw new ApiError(409, "Category slug already exists");
    }

    const existingName =
      await categoryRepository.findByName(name);

    if (existingName) {
      throw new ApiError(409, "Category name already exists");
    }

    return categoryRepository.create({
      name,
      slug,
      imageUrl,
    });
  }

  async getAll() {
    return categoryRepository.findAll();
  }
}

export default new CategoryService();