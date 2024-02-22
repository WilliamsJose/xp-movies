import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { MovieCategory } from '../entities'
import { IMovieCategoryRepository } from '../domains/repositories'
import { IMovieCategory, IMovie, ICategory } from '../domains/entities'

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
    const movieCategory: IMovieCategory[] = categories.map((category) => this.repository.create({ movie, category }))

    const saved = await this.repository.save(movieCategory)

    return saved ?? undefined
  }
}
