import { RefreshTokenController } from '../controllers'
import { UserTokenRepository } from '../repositories'
import { RefreshTokenUseCase } from '../useCases/RefreshTokenUseCase'

export const makeRefreshTokenController = () => {
  return new RefreshTokenController(new RefreshTokenUseCase(new UserTokenRepository()))
}
