import { ICategory, IMovie, IMovieCategory } from '../entities'

export interface IMovieCategoryRepository {
  getById(id: number): Promise<IMovieCategory | undefined>
  save(movie: IMovie, categories: ICategory[]): Promise<IMovieCategory[] | undefined>
}
