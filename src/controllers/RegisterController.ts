import { HTTPStatusCode } from "../enums/HTTPStatusCode"
import { validate } from "email-validator"
import bcrypt from 'bcrypt'
import { IController } from "../interfaces/controllers/IController"
import { IUserRepository } from "../interfaces/repositories/IUserRepository"

export class RegisterController implements IController {
  constructor(private userRepository: IUserRepository) {}

  async handle(request: any): Promise<any> {
    const { name, email, password } = request.body
    
    if (!name || !email || !password) {
      return {
        status: HTTPStatusCode.BadRequest,
        body: {
          message: 'You must provide a name, email and password.'
        }
      }
    }

    if (!validate(email)) {
      return {
        status: HTTPStatusCode.BadRequest,
        body: {
          message: 'Email is not valid'
        }
      }
    }

    try {
      const encryptedPass = await bcrypt.hash(password, 12)
      const newUser = await this.userRepository.save(name, email, encryptedPass)

      return {
        status: HTTPStatusCode.Created,
        body: {
          newUser 
        }
      }
    } catch (error: any) {
      if (error.code === '23505') {
        return {
          status: HTTPStatusCode.Conflict,
          body: {
            message: `Email: ${email} already registered!`
          }
        }
      }

      return {
        status: HTTPStatusCode.InternalServerError,
        body: {
          message: error.detail
        }
      }
    }
  }
}