import { ICategory, IMovie } from '.'

export interface IMovieCategory {
  id: number
  createdAt: Date
  updatedAt: Date
  category: ICategory
  movie: IMovie
}
