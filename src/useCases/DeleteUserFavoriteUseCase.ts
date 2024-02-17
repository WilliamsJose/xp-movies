import { IUserMovieRepository } from '../domains/repositories'
import { IUseCase } from '../domains/useCases/IUseCase'
import { IUseCaseResult } from '../domains/useCases/IUseCaseResult'
import { UseCaseResponsesEnum } from '../enums/UseCaseResponsesEnum'

export class DeleteUserFavoriteUseCase implements IUseCase {
  constructor(private userMovieRepository: IUserMovieRepository) {}
  async execute(userMovieId: number): Promise<IUseCaseResult> {
    if (!userMovieId) {
      return {
        code: UseCaseResponsesEnum.InvalidParameters,
        body: 'Missing param: userMovieId.'
      }
    }

    if (userMovieId < 0) {
      return {
        code: UseCaseResponsesEnum.InvalidParameters,
        body: 'Invalid param: userMovieId must not be negative.'
      }
    }

    const rowsAffected = await this.userMovieRepository.deleteByUserMovieId(userMovieId)

    return {
      code: UseCaseResponsesEnum.DBDeleted,
      headers: rowsAffected
    }
  }
}
