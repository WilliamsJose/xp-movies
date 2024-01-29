import { FindAllUserFavorites } from '../controllers'
import { UserMovieRepository } from '../repositories/userMovieRepository'

export const makeFindAllUserFavorites = () => {
  return new FindAllUserFavorites(new UserMovieRepository())
}
