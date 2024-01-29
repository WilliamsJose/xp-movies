import { AddNewUserFavoriteController } from '../controllers/AddNewUserFavoriteController'
import { CategoryRepository } from '../repositories/categoryRepository'
import { MovieCategoryRepository } from '../repositories/movieCategoryRepository'
import { MovieRepository } from '../repositories/movieRepository'
import { UserMovieRepository } from '../repositories/userMovieRepository'
import { UserRepository } from '../repositories/userRepository'

export const makeAddNewUserFavoriteController = () => {
  return new AddNewUserFavoriteController(
    new UserRepository(),
    new MovieRepository(),
    new CategoryRepository(),
    new MovieCategoryRepository(),
    new UserMovieRepository()
  )
}
