import { IUseCase } from '../domains/useCases/IUseCase'
import jwt from 'jsonwebtoken'
import { IUserTokenRepository } from '../domains/repositories'
import { IUseCaseResult } from '../domains/useCases/IUseCaseResult'
import { UseCaseResponsesEnum } from '../enums/UseCaseResponsesEnum'

export class RefreshTokenUseCase implements IUseCase {
  constructor(private userTokenRepository: IUserTokenRepository) {}

  async execute(refreshToken: string): Promise<IUseCaseResult> {
    try {
      if (!refreshToken) {
        return {
          code: UseCaseResponsesEnum.InvalidParameters,
          body: 'Missing Param: refreshToken.'
        }
      }

      // is token valid?
      const decodedUserToken: any = jwt.verify(refreshToken, process.env.REFRESH_SECRET || '')

      // token exists on database?
      await this.userTokenRepository.findRefreshToken(refreshToken)

      const newAccessToken = jwt.sign({ id: decodedUserToken.id }, process.env.ACCESS_SECRET || '', {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
      })

      return {
        code: UseCaseResponsesEnum.Success,
        body: 'New access token generated!',
        headers: { Authorization: newAccessToken }
      }
    } catch (error) {
      return {
        code: UseCaseResponsesEnum.InvalidToken,
        body: 'Invalid token provided.'
      }
    }
  }
}
