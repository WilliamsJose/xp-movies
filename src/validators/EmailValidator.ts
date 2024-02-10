import { validate } from 'email-validator'
import { IEmailValidator } from '../domains/validators/IEmailValidator'

export class EmailValidator implements IEmailValidator {
  async isValid(email: string): Promise<boolean> {
    return validate(email)
  }
}
