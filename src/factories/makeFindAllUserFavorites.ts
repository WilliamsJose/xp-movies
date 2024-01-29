import { FindAllUserFavorites } from '../controllers'
import { UserMovieRepository } from '../repositories'

export const makeFindAllUserFavorites = () => {
  return new FindAllUserFavorites(new UserMovieRepository())
}
