import { validate } from 'email-validator'
import { IEmailValidator } from '../domains/validators/IEmailValidator'

export class EmailValidator implements IEmailValidator {
  isValid(email: string): boolean {
    return validate(email)
  }
}
