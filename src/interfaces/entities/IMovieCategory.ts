import { ICategory } from "./ICategory"
import { IMovie } from "./IMovie"

export interface IMovieCategory {
  id: number
  createdAt: Date
  updatedAt: Date
  category: ICategory
  movie: IMovie
}