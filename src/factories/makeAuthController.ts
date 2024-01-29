import { AuthController } from '../controllers'
import { UserRepository, UserTokenRepository } from '../repositories'

export const makeAuthController = () => {
  return new AuthController(new UserRepository(), new UserTokenRepository())
}
