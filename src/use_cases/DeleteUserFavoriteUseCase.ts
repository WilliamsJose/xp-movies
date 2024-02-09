import { DeleteUserFavoriteEnum } from '../enums/DeleteUserFavoriteEnum'
import { IUserMovieRepository } from '../interfaces/repositories'
import { IUseCase } from '../interfaces/use_cases/IUseCase'

export class deleteUserFavoriteUseCase implements IUseCase {
  constructor(private userMovieRepository: IUserMovieRepository) {}
  async execute(userMovieId: number): Promise<any> {
    if (!userMovieId) return DeleteUserFavoriteEnum.InvalidParameters

    return await this.userMovieRepository.deleteByUserMovieId(userMovieId)
  }
}
