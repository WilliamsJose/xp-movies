import { FindAllUserFavoritesController } from '../controllers'
import { MovieRepository, UserMovieRepository } from '../repositories'
import { FindAllUserFavoritesUseCase } from '../useCases/FindAllUserFavoritesUseCase'

export const makeFindAllUserFavoritesController = () => {
  return new FindAllUserFavoritesController(
    new FindAllUserFavoritesUseCase(new UserMovieRepository(), new MovieRepository())
  )
}
