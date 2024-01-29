import { RefreshTokenController } from '../controllers'
import { UserTokenRepository } from '../repositories'

export const makeRefreshTokenController = () => {
  return new RefreshTokenController(new UserTokenRepository())
}
