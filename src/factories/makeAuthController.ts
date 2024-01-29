import { AuthController } from '../controllers'
import { UserRepository } from '../repositories/userRepository'
import { UserTokenRepository } from '../repositories/userTokenRepository'

export const makeAuthController = () => {
  return new AuthController(new UserRepository(), new UserTokenRepository())
}
