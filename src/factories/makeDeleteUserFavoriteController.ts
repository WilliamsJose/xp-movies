import { DeleteUserFavoriteController } from '../controllers'
import { UserMovieRepository } from '../repositories'
import { deleteUserFavoriteUseCase } from '../useCases/DeleteUserFavoriteUseCase'

export const makeDeleteUserFavoriteController = () => {
  return new DeleteUserFavoriteController(new deleteUserFavoriteUseCase(new UserMovieRepository()))
}
