import { IUserRepository, IUserTokenRepository } from '../domains/repositories'
import { IUseCase } from '../domains/useCases/IUseCase'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UseCaseResponsesEnum } from '../enums/UseCaseResponsesEnum'
import { IUseCaseResult } from '../domains/useCases/IUseCaseResult'
export class AuthUseCase implements IUseCase {
  constructor(
    private userRepository: IUserRepository,
    private userTokenRepository: IUserTokenRepository
  ) {}
  async execute(email: string, password: string): Promise<IUseCaseResult> {
    if (!email || !password) {
      return {
        code: UseCaseResponsesEnum.InvalidParameters,
        body: 'Missing params: email or password!'
      }
    }

    const userFound = await this.userRepository.getByEmail(email)

    if (!userFound) {
      return {
        code: UseCaseResponsesEnum.UserNotFound,
        body: 'User Not found on database.'
      }
    }

    const successLogin = await bcrypt.compare(password, userFound.password)

    if (!successLogin) {
      return {
        code: UseCaseResponsesEnum.InvalidCredentials,
        body: 'Wrong Email or Password!'
      }
    }

    const accessToken = jwt.sign({ id: userFound.id }, process.env.ACCESS_SECRET || '123', {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || 10
    })

    const refreshToken = jwt.sign({ id: userFound.id }, process.env.REFRESH_SECRET || '123', {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || 10
    })

    const refreshTokenFound = await this.userTokenRepository.getByUserId(userFound.id)

    if (refreshTokenFound) {
      await this.userTokenRepository.update(userFound.id, refreshToken)
    } else {
      await this.userTokenRepository.save(refreshToken, userFound)
    }

    const headers = {
      Authorization: accessToken,
      refreshToken: refreshToken
    }

    return {
      code: UseCaseResponsesEnum.Success,
      body: 'User logged in successfully!',
      headers
    }
  }
}
