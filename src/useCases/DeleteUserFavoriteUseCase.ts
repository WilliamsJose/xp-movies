import { IUserMovieRepository } from '../domains/repositories'
import { IUseCase } from '../domains/useCases/IUseCase'
import { IUseCaseResult } from '../domains/useCases/IUseCaseResult'
import { UseCasesEnum } from '../enums/UseCasesEnum'

export class deleteUserFavoriteUseCase implements IUseCase {
  constructor(private userMovieRepository: IUserMovieRepository) {}
  async execute(userMovieId: number): Promise<IUseCaseResult> {
    if (!userMovieId) {
      return {
        code: UseCasesEnum.InvalidParameters,
        message: 'Missing param: userMovieId.'
      }
    }

    const rowsAffected = await this.userMovieRepository.deleteByUserMovieId(userMovieId)

    return {
      code: UseCasesEnum.DBDeleted,
      headers: rowsAffected
    }
  }
}
