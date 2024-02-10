import { AddNewUserFavoriteController } from '../controllers'
import {
  CategoryRepository,
  MovieCategoryRepository,
  MovieRepository,
  UserMovieRepository,
  UserRepository
} from '../repositories'
import { AddNewUserFavoriteUseCase } from '../useCases/AddNewUserFavoriteUseCase'

export const makeAddNewUserFavoriteController = () => {
  return new AddNewUserFavoriteController(
    new AddNewUserFavoriteUseCase(
      new UserRepository(),
      new MovieRepository(),
      new CategoryRepository(),
      new MovieCategoryRepository(),
      new UserMovieRepository()
    )
  )
}
