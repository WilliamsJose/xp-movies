import { ICategory } from '../entities/ICategory'
import { IMovie } from '../entities/IMovie'
import { IMovieCategory } from '../entities/IMovieCategory'

export interface IMovieCategoryRepository {
  getById(id: number): Promise<IMovieCategory | undefined>
  save(movie: IMovie, categories: ICategory[]): Promise<IMovieCategory[] | undefined>
}
