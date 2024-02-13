import bcrypt from 'bcrypt'
import { IUserRepository } from '../domains/repositories'
import { IUseCase } from '../domains/useCases/IUseCase'
import { IEmailValidator } from '../domains/validators/IEmailValidator'
import { IUseCaseResult } from '../domains/useCases/IUseCaseResult'
import { UseCaseResponsesEnum } from '../enums/UseCaseResponsesEnum'

export class RegisterUseCase implements IUseCase {
  constructor(
    private userRepository: IUserRepository,
    private emailValidator: IEmailValidator
  ) {}

  async execute(name: string, email: string, password: string): Promise<IUseCaseResult> {
    if (!name || !email || !password) {
      return {
        code: UseCaseResponsesEnum.InvalidParameters,
        body: 'Missing params: name, email or password.'
      }
    }

    if (!this.emailValidator.isValid(email)) {
      return {
        code: UseCaseResponsesEnum.InvalidEmail,
        body: 'Invalid Email!'
      }
    }

    const encryptedPass = await bcrypt.hash(password, 12)

    try {
      const newUser = await this.userRepository.save(name, email, encryptedPass)
      return {
        code: UseCaseResponsesEnum.Success,
        body: newUser
      }
    } catch (error) {
      return {
        code: UseCaseResponsesEnum.AlreadyRegistered,
        body: 'Email already registered!'
      }
    }
  }
}
