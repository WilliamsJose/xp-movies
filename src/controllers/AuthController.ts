import { Request, Response } from "express"
import { IAuthController } from "../interfaces/controllers/IAuthController"
import { validate } from "email-validator"
import { userRepository } from "../repositories/userRepository"
import { userTokenRepository } from "../repositories/userTokenRepository";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { HTTPStatusCode } from "../enums/HTTPStatusCode";

export class AuthController implements IAuthController {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    try {
      const userFound = await userRepository.getByEmail(email)

      if (!userFound) {
        return res.status(HTTPStatusCode.BadRequest).json({ message: 'Wrong Email or Password' })
      } 

      const successLogin = await bcrypt.compare(password, userFound.password)

      if (successLogin) {
        const accessToken = jwt.sign({ id: userFound.id }, process.env.JWT_SECRET || "", {
          expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        });

        const refreshToken = jwt.sign({ id: userFound.id }, process.env.JWT_SECRET || "", {
          expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        });

        const refreshTokenFound = await userTokenRepository.getByUserId(userFound.id)

        if (refreshTokenFound) {
          await userTokenRepository.update(userFound.id, refreshToken)
        } else {
          await userTokenRepository.save(refreshToken, userFound)
        }

        const headers = {
          'Authorization': accessToken, 
          'refreshToken': refreshToken
        }

        return res
          .header(headers)
          .status(HTTPStatusCode.OK)
          .json({ message: 'Sign in Successfully!' })
      } else {
        return res.status(HTTPStatusCode.BadRequest).json({ message: 'Wrong Email or Password' })
      }
    } catch (error: any) {
      return res.status(HTTPStatusCode.InternalServerError).json({ message: error.message })
    }
  }

  async register(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body
    
    if (!name || !email || !password) {
      return res.status(HTTPStatusCode.BadRequest).json({ message: 'You must provide a name, email and password.' })
    }

    if (!validate(email)) {
      return res.status(HTTPStatusCode.BadRequest).json({ message: 'Email is not valid' })
    }

    try {
      const encryptedPass = await bcrypt.hash(password, 12)
      const newUser = await userRepository.save(name, email, encryptedPass)

      return res.status(HTTPStatusCode.Created).json({ newUser })
    } catch (error: any) {
      if (error.code === '23505') {
        return res.status(HTTPStatusCode.Conflict).json({ message: `Email: ${email} already registered!` })
      }
      return res.status(HTTPStatusCode.InternalServerError).json({ message: error.detail })
    }
  }
}