import { IController } from '../interfaces/controllers'
import {
  createResponseBadRequest,
  createResponseInternalServerError,
  createResponseNotFound,
  createResponseSuccess
} from '../helpers/apiResponse'
import { IUseCase } from '../interfaces/useCases/IUseCase'
import { AuthEnum } from '../enums/AuthEnum'

export class AuthController implements IController {
  constructor(private authUseCase: IUseCase) {}

  async handle(request: any): Promise<any> {
    const { email, password } = request.body

    try {
      const result = await this.authUseCase.execute(email, password)
      switch (result) {
        case AuthEnum.InvalidCredentials:
          return createResponseBadRequest(AuthEnum.InvalidCredentials)
        case AuthEnum.UserNotFound:
          return createResponseNotFound(AuthEnum.UserNotFound)
        default:
          return createResponseSuccess(AuthEnum.Success, result)
      }
    } catch (error: any) {
      return createResponseInternalServerError(error)
    }
  }
}
