import { AuthEnum } from '../enums/AuthEnum'
import { IUserRepository, IUserTokenRepository } from '../interfaces/repositories'
import { IUseCase } from '../interfaces/useCases/IUseCase'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

type AuthResult = {
  Authorization: string
  refreshToken: string
}

export class AuthUseCase implements IUseCase {
  constructor(
    private userRepository: IUserRepository,
    private userTokenRepository: IUserTokenRepository
  ) {}
  async execute(email: string, password: string): Promise<AuthResult | AuthEnum | undefined> {
    const userFound = await this.userRepository.getByEmail(email)

    if (!userFound) return AuthEnum.UserNotFound

    const successLogin = await bcrypt.compare(password, userFound.password)

    if (!successLogin) return AuthEnum.InvalidCredentials

    const accessToken = jwt.sign({ id: userFound.id }, process.env.ACCESS_SECRET || '', {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
    })

    const refreshToken = jwt.sign({ id: userFound.id }, process.env.REFRESH_SECRET || '', {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
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

    return headers
  }
}
