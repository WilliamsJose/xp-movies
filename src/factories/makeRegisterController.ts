import { RegisterController } from '../controllers'
import { UserRepository } from '../repositories'
import { RegisterService } from '../services/RegisterService'

export const makeRegisterController = () => {
  return new RegisterController(new RegisterService(new UserRepository()))
}
