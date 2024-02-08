import { RegisterController } from '../controllers'
import { UserRepository } from '../repositories'
import { RegisterUseCase } from '../use_cases/RegisterUseCase'

export const makeRegisterController = () => {
  return new RegisterController(new RegisterUseCase(new UserRepository()))
}
