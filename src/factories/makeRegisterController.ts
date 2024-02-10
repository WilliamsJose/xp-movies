import { RegisterController } from '../controllers'
import { UserRepository } from '../repositories'
import { RegisterUseCase } from '../useCases/RegisterUseCase'
import { EmailValidator } from '../validators/EmailValidator'

export const makeRegisterController = () => {
  return new RegisterController(new RegisterUseCase(new UserRepository(), new EmailValidator()))
}
