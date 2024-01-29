import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { MovieCategory } from '../entities/MovieCategory'
import { IMovieCategoryRepository } from '../interfaces/repositories/IMovieCategoryRepository'
import { IMovieCategory } from '../interfaces/entities/IMovieCategory'
import { IMovie } from '../interfaces/entities/IMovie'
import { ICategory } from '../interfaces/entities/ICategory'

export class MovieCategoryRepository implements IMovieCategoryRepository {
  private repository: Repository<IMovieCategory>

  constructor() {
    this.repository = AppDataSource.getRepository(MovieCategory)
  }

  async getById(id: number): Promise<IMovieCategory | undefined> {
    const movieCategory = await this.repository.findOneBy({ id })
    return movieCategory ?? undefined
  }

  async save(movie: IMovie, categories: ICategory[]): Promise<IMovieCategory[] | undefined> {
    const saved: IMovieCategory[] = categories.map((category) => this.repository.create({ movie, category }))

    await this.repository.save(saved)

    return saved ?? undefined
  }
}
