import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { MovieCategory } from "../entities/MovieCategory";
import { IMovieCategoryRepository } from "../interfaces/repositories/IMovieCategoryRepository";
import { IMovieCategory } from "../interfaces/entities/IMovieCategory";
import { IMovie } from "../interfaces/entities/IMovie";
import { ICategory } from "../interfaces/entities/ICategory";

class MovieCategoryRepository implements IMovieCategoryRepository {
  private repository: Repository<IMovieCategory>

  constructor() {
    this.repository = AppDataSource.getRepository(MovieCategory)
  }

  async getById(id: number): Promise<IMovieCategory | undefined> {
    throw new Error("Method not implemented.");
  }

  async save(movie: IMovie, categories: ICategory[] ): Promise<IMovieCategory | undefined> {
    throw new Error("Method not implemented.");
  }
}

export const movieCategoryRepository = new MovieCategoryRepository()