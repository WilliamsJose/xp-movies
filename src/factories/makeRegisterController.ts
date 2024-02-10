import { RegisterController } from '../controllers'
import { UserRepository } from '../repositories'
import { RegisterUseCase } from '../useCases/RegisterUseCase'

export const makeRegisterController = () => {
  return new RegisterController(new RegisterUseCase(new UserRepository()))
}
