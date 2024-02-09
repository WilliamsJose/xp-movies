import { RefreshTokenEnum } from '../enums/RefreshTokenEnum'
import { IUseCase } from '../interfaces/use_cases/IUseCase'
import jwt from 'jsonwebtoken'
import { UserTokenRepository } from '../repositories'

export class RefreshTokenUseCase implements IUseCase {
  constructor(private userTokenRepository: UserTokenRepository) {}

  async execute(refreshToken: string): Promise<any | undefined> {
    try {
      if (!refreshToken) return RefreshTokenEnum.InvalidParameters

      // is token valid?
      const decodedUserToken: any = jwt.verify(refreshToken, process.env.REFRESH_SECRET || '')

      // token exists on database?
      await this.userTokenRepository.getNewAccessToken(refreshToken)

      const newAccessToken = jwt.sign({ id: decodedUserToken.id }, process.env.ACCESS_SECRET || '', {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
      })

      return newAccessToken
    } catch (error) {
      return RefreshTokenEnum.InvalidToken
    }
  }
}