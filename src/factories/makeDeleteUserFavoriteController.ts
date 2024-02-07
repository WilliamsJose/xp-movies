import { DeleteUserFavoriteController } from '../controllers'
import { UserMovieRepository } from '../repositories'

export const makeDeleteUserFavoriteController = () => {
  return new DeleteUserFavoriteController(new UserMovieRepository())
}
