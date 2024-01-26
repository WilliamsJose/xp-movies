import { Request, Response } from "express"
import { IAuthController } from "../interfaces/IAuthController"
import { validate } from "email-validator"
import { userRepository } from "../repositories/userRepository"
import { userTokenRepository } from "../repositories/userTokenRepository";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { ApiResponse } from "../enums/ApiResponse";

export class AuthController implements IAuthController {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    try {
      const userFound = await userRepository.findOneByOrFail({ email })
      const successLogin = await bcrypt.compare(password, userFound.password)

      if (successLogin) {
        const accessToken = jwt.sign({ id: userFound.id }, process.env.JWT_SECRET || "", {
          expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        });

        const refreshToken = jwt.sign({ id: userFound.id }, process.env.JWT_SECRET || "", {
          expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        });

        const refreshTokenFound = await userTokenRepository.findOneBy({ user: { id: userFound.id } })

        if (refreshTokenFound) {
          userTokenRepository.update({ user: {id: userFound.id }}, { refreshToken })
        } else {
          const newUserToken = userTokenRepository.create({ refreshToken, user: userFound })
          userTokenRepository.save(newUserToken)
        }

        const headers = {
          'Authorization': accessToken, 
          'refreshToken': refreshToken
        }

        return res
          .header(headers)
          .status(ApiResponse.OK)
          .json({ message: 'Sign in Successfully!' })
      } else {
        return res.status(ApiResponse.BadRequest).json({ message: 'Wrong Email or Password' })
      }
    } catch (error: any) {
      return res.status(ApiResponse.InternalServerError).json({ message: error.message })
    }
  }

  async register(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'You must provide a name, email and password.' })
    }

    if (!validate(email)) {
      return res.status(400).json({ message: 'Email is not valid' })
    }

    try {
      const encryptedPass = await bcrypt.hash(password, 10)

      const newUser = userRepository.create({
        name, email, password: encryptedPass
      })

      await userRepository.save(newUser)

      return res.status(201).json({ newUser })
    } catch (error: any) {
      if (error.code === '23505') {
        return res.status(409).json({ message: `Email: ${email} already registered!` })
      }
      return res.status(500).json({ message: error.detail })
    }
  }
}