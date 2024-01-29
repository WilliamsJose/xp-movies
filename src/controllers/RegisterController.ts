import { RegisterEnum } from '../enums'
import {
  createResponseBadRequest,
  createResponseConflict,
  createResponseInternalServerError,
  createResponseSuccess
} from '../helpers/apiResponse'
import { IController } from '../interfaces/controllers'
import { IService } from '../interfaces/services/IService'

export class RegisterController implements IController {
  constructor(private registerService: IService) {}

  async handle(request: any): Promise<any> {
    const { name, email, password } = request.body

    try {
      const result = await this.registerService.execute(name, email, password)

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
