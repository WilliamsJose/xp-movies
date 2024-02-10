import bcrypt from 'bcrypt'
import { validate } from 'email-validator'
import { RegisterEnum } from '../enums'
import { IUserRepository } from '../interfaces/repositories'
import { IUseCase } from '../interfaces/useCases/IUseCase'
import { IUser } from '../interfaces/entities'

export class RegisterUseCase implements IUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(name: string, email: string, password: string): Promise<IUser | RegisterEnum | undefined> {
    if (!name || !email || !password) return RegisterEnum.InvalidParameters

    if (!validate(email)) return RegisterEnum.InvalidEmail

    const encryptedPass = await bcrypt.hash(password, 12)

    try {
      const newUser = await this.userRepository.save(name, email, encryptedPass)
      return newUser
    } catch (error) {
      return RegisterEnum.AlreadyRegistered
    }
  }
}
