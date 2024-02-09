import { DeleteUserFavoriteController } from '../controllers'
import { UserMovieRepository } from '../repositories'
import { deleteUserFavoriteUseCase } from '../use_cases/DeleteUserFavoriteUseCase'

export const makeDeleteUserFavoriteController = () => {
  return new DeleteUserFavoriteController(new deleteUserFavoriteUseCase(new UserMovieRepository()))
}
