import { FindAllUserFavoritesController } from '../controllers'
import { UserMovieRepository } from '../repositories'

export const makeFindAllUserFavoritesController = () => {
  return new FindAllUserFavoritesController(new UserMovieRepository())
}
