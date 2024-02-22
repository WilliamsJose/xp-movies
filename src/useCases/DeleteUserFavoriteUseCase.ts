import { IUserMovieRepository } from '../domains/repositories'
import { IUseCase } from '../domains/useCases/IUseCase'
import { IUseCaseResult } from '../domains/useCases/IUseCaseResult'
import { UseCaseResponsesEnum } from '../enums/UseCaseResponsesEnum'
import jwt from 'jsonwebtoken'

export class DeleteUserFavoriteUseCase implements IUseCase {
  constructor(private userMovieRepository: IUserMovieRepository) {}
  async execute(userMovieId: number, accessToken: string): Promise<IUseCaseResult> {
    if (!userMovieId || !accessToken) {
      return {
        code: UseCaseResponsesEnum.InvalidParameters,
        body: 'Missing params: userMovieId or Authorization.'
      }
    }

    if (userMovieId < 0) {
      return {
        code: UseCaseResponsesEnum.InvalidParameters,
        body: 'Invalid param: userMovieId must not be negative.'
      }
    }

    let validAccessToken: any
    try {
      validAccessToken = jwt.verify(accessToken, process.env.ACCESS_SECRET || '123')
    } catch (error) {
      return {
        code: UseCaseResponsesEnum.InvalidToken,
        body: 'Invalid token provided.'
      }
    }

    const rowsAffected = await this.userMovieRepository.deleteByUserMovieId(userMovieId, validAccessToken.id)

    return {
      code: UseCaseResponsesEnum.DBDeleted,
      headers: rowsAffected
    }
  }
}
