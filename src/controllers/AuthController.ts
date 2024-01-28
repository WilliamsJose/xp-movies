// import { Request, Response } from "express"
// import { IAuthController } from "../interfaces/controllers/IAuthController"
// import { userRepository } from "../repositories/userRepository"
// import { userTokenRepository } from "../repositories/userTokenRepository";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { HTTPStatusCode } from "../enums/HTTPStatusCode";
import { IController } from "../interfaces/controllers/IController";
import { IUserRepository } from "../interfaces/repositories/IUserRepository";
import { IUserTokenRepository } from "../interfaces/repositories/IUserTokenRepository";

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

      const accessToken = jwt.sign({ id: userFound.id }, process.env.JWT_SECRET || "", {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
      });

      const refreshToken = jwt.sign({ id: userFound.id }, process.env.JWT_SECRET || "", {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      });

      const refreshTokenFound = await this.userTokenRepository.getByUserId(userFound.id)

      if (refreshTokenFound) {
        await this.userTokenRepository.update(userFound.id, refreshToken)
      } else {
        await this.userTokenRepository.save(refreshToken, userFound)
      }

      const headers = {
        'Authorization': accessToken,
        'refreshToken': refreshToken
      }

      return {
        status: HTTPStatusCode.OK,
        query: headers,
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
