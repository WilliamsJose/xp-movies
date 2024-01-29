import { AddNewUserFavoriteController } from '../controllers'
import {
  CategoryRepository,
  MovieCategoryRepository,
  MovieRepository,
  UserMovieRepository,
  UserRepository
} from '../repositories'

export const makeAddNewUserFavoriteController = () => {
  return new AddNewUserFavoriteController(
    new UserRepository(),
    new MovieRepository(),
    new CategoryRepository(),
    new MovieCategoryRepository(),
    new UserMovieRepository()
  )
}
