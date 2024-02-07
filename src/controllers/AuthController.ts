import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { HTTPStatusCode } from '../enums'
import { IController } from '../interfaces/controllers'
import { IUserRepository, IUserTokenRepository } from '../interfaces/repositories'

export class AuthController implements IController {
  constructor(private userRepository: IUserRepository, private userTokenRepository: IUserTokenRepository) {}

  async handle(request: any): Promise<any> {
    const { email, password } = request.body

    try {
      const userFound = await this.userRepository.getByEmail(email)

      if (!userFound) {
        return {
          status: HTTPStatusCode.BadRequest,
          body: {
            message: 'Wrong Email or Password'
          }
        }
      }

      const successLogin = await bcrypt.compare(password, userFound.password)

      if (!successLogin) {
        return {
          status: HTTPStatusCode.BadRequest,
          body: {
            message: 'Wrong Email or Password'
          }
        }
      }

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

      return {
        status: HTTPStatusCode.OK,
        headers,
        body: {
          message: 'Sign in Successfully!'
        }
      }
    } catch (error: any) {
      return {
        status: HTTPStatusCode.InternalServerError,
        body: {
          message: error
        }
      }
    }
  }
}
