import { RegisterController } from "../controllers/RegisterController"
import { UserRepository } from "../repositories/userRepository"

export const makeRegisterController = () => {
  return new RegisterController(new UserRepository())
}
