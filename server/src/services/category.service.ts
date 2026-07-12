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
  async update(id: string, data: { name?: string; isActive?: boolean }) {
    const category = await categoryRepository.findById(id);
    if (!category) throw new ApiError(404, "Category not found");
    return categoryRepository.update(id, data);
  }

  async delete(id: string) {
    const category = await categoryRepository.findById(id);
    if (!category) throw new ApiError(404, "Category not found");
    return categoryRepository.delete(id);
  }
}

export default new CategoryService();