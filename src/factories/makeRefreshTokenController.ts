import { RefreshTokenController } from '../controllers'
import { UserTokenRepository } from '../repositories/userTokenRepository'

export const makeRefreshTokenController = () => {
  return new RefreshTokenController(new UserTokenRepository())
}
