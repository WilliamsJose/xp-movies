import { RegisterEnum } from '../enums'
import {
  createResponseBadRequest,
  createResponseConflict,
  createResponseInternalServerError,
  createResponseSuccess
} from '../helpers/apiResponse'
import { IController } from '../interfaces/controllers'
import { IUseCase } from '../interfaces/use_cases/IUseCase'

export class RegisterController implements IController {
  constructor(private registerUseCase: IUseCase) {}

  async handle(request: any): Promise<any> {
    const { name, email, password } = request.body

    try {
      const result = await this.registerUseCase.execute(name, email, password)

      switch (result) {
        case RegisterEnum.InvalidParameters:
          return createResponseBadRequest(RegisterEnum.InvalidParameters)
        case RegisterEnum.InvalidEmail:
          return createResponseBadRequest(RegisterEnum.InvalidEmail)
        case RegisterEnum.AlreadyRegistered:
          return createResponseConflict(RegisterEnum.AlreadyRegistered)
        default:
          return createResponseSuccess(result)
      }
    } catch (error) {
      return createResponseInternalServerError(error)
    }
  }
}
