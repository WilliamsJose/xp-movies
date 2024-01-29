import { RegisterController } from '../controllers'
import { UserRepository } from '../repositories/userRepository'

export const makeRegisterController = () => {
  return new RegisterController(new UserRepository())
}
