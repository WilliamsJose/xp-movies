import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { MovieCategory } from '../entities'
import { IMovieCategoryRepository } from '../interfaces/repositories'
import { IMovieCategory, IMovie, ICategory } from '../interfaces/entities'

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
