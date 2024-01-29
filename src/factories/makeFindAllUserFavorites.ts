import { FindAllUserFavorites } from '../controllers/FindAllUserFavorites'
import { UserMovieRepository } from '../repositories/userMovieRepository'

export const makeFindAllUserFavorites = () => {
  return new FindAllUserFavorites(new UserMovieRepository())
}
