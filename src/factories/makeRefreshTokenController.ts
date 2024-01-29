import { RefreshTokenController } from "../controllers/RefreshTokenController"
import { UserTokenRepository } from "../repositories/userTokenRepository"

export const makeRefreshTokenController = () => {
  return new RefreshTokenController(new UserTokenRepository())
}
