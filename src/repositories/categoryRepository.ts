import { AppDataSource } from "../data-source";
import { Category } from "../entities/Category";

export const categoryRepository = AppDataSource.getRepository(Category)