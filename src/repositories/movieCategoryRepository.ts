import { AppDataSource } from "../data-source";
import { MovieCategory } from "../entities/MovieCategory";

export const movieCategoryRepository = AppDataSource.getRepository(MovieCategory)