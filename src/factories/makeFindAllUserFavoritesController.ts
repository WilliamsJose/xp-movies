import { FindAllUserFavoritesController } from '../controllers'
import { MovieRepository, UserMovieRepository } from '../repositories'
import { FindAllUserFavoritesUseCase } from '../use_cases/FindAllUserFavoritesUseCase'

export const makeFindAllUserFavoritesController = () => {
  return new FindAllUserFavoritesController(
    new FindAllUserFavoritesUseCase(new UserMovieRepository(), new MovieRepository())
  )
}
