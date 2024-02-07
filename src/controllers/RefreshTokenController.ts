import { HTTPStatusCode } from '../enums'
import { IController } from '../interfaces/controllers'
import { IUserTokenRepository } from '../interfaces/repositories'
import jwt from 'jsonwebtoken'

export class RefreshTokenController implements IController {
  constructor(private userTokenRepository: IUserTokenRepository) {}

  async handle(request: any): Promise<any> {
    const { refreshtoken: refreshToken } = request.headers

    try {
      if (!refreshToken) {
        return {
          status: HTTPStatusCode.BadRequest,
          body: {
            message: 'No refresh token provided.'
          }
        }
      }

      // is token valid?
      const decodedUserToken: any = jwt.verify(String(refreshToken), process.env.REFRESH_SECRET || '')

      // token exists on database?
      await this.userTokenRepository.getNewAccessToken(refreshToken.toString())

      const newAccessToken = jwt.sign({ id: decodedUserToken.id }, process.env.ACCESS_SECRET || '', {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
      })

      return {
        status: HTTPStatusCode.OK,
        headers: { Authorizaton: newAccessToken },
        body: {
          message: 'New access token generated'
        }
      }
    } catch (error: any) {
      return {
        status: HTTPStatusCode.InternalServerError,
        body: {
          message: 'No refresh token provided.'
        }
      }
    }
  }
}
