import { RegisterController } from '../controllers'
import { UserRepository } from '../repositories'

export const makeRegisterController = () => {
  return new RegisterController(new UserRepository())
}
