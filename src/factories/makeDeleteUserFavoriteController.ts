import { DeleteUserFavoriteController } from '../controllers'
import { UserMovieRepository } from '../repositories'
import { DeleteUserFavoriteUseCase } from '../useCases/DeleteUserFavoriteUseCase'

export const makeDeleteUserFavoriteController = () => {
  return new DeleteUserFavoriteController(new DeleteUserFavoriteUseCase(new UserMovieRepository()))
}
