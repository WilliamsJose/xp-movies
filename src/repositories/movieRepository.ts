import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/Movie";
import { IMovie } from "../interfaces/entities/IMovie";
import { IMovieRepository } from "../interfaces/repositories/IMovieRepository";
import { ICategory } from "../interfaces/entities/ICategory";

class MovieRepository implements IMovieRepository {
  private repository: Repository<IMovie>

  constructor() {
    this.repository = AppDataSource.getRepository(Movie)
  }

  async getByImdb(imdbId: string): Promise<IMovie | undefined> {
    throw new Error("Method not implemented.");
  }

  async save(imdbId: string, title: string): Promise<IMovie | undefined> {
    const newMovie = this.repository.create({ imdbId, title })
    const saved = await this.repository.save(newMovie)
    return saved ?? undefined
  }
}

export const movieRepository = new MovieRepository()