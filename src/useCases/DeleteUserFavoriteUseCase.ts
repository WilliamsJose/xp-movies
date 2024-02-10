import { DeleteUserFavoriteEnum } from '../enums/DeleteUserFavoriteEnum'
import { IUserMovieRepository } from '../domains/repositories'
import { IUseCase } from '../domains/useCases/IUseCase'

export class deleteUserFavoriteUseCase implements IUseCase {
  constructor(private userMovieRepository: IUserMovieRepository) {}
  async execute(userMovieId: number): Promise<any> {
    if (!userMovieId) return DeleteUserFavoriteEnum.InvalidParameters

    return await this.userMovieRepository.deleteByUserMovieId(userMovieId)
  }
}
