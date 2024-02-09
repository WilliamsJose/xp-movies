import { AuthController } from '../controllers'
import { UserRepository, UserTokenRepository } from '../repositories'
import { AuthUseCase } from '../use_cases/AuthUseCase'

export const makeAuthController = () => {
  return new AuthController(new AuthUseCase(new UserRepository(), new UserTokenRepository()))
}
