import { RefreshTokenController } from '../controllers'
import { UserTokenRepository } from '../repositories'
import { RefreshTokenUseCase } from '../use_cases/RefreshTokenUseCase'

export const makeRefreshTokenController = () => {
  return new RefreshTokenController(new RefreshTokenUseCase(new UserTokenRepository()))
}
