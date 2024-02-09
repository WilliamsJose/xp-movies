import { RefreshTokenEnum } from '../enums/RefreshTokenEnum'
import {
  createResponseBadRequest,
  createResponseInternalServerError,
  createResponseSuccess
} from '../helpers/apiResponse'
import { IController } from '../interfaces/controllers'
import { IUseCase } from '../interfaces/use_cases/IUseCase'

export class RefreshTokenController implements IController {
  constructor(private refreshTokenUseCase: IUseCase) {}

  async handle(request: any): Promise<any> {
    const { refreshtoken: refreshToken } = request.headers

    try {
      const result = await this.refreshTokenUseCase.execute(refreshToken)

      switch (result) {
        case RefreshTokenEnum.InvalidParameters:
          return createResponseBadRequest(RefreshTokenEnum.InvalidParameters)
        case RefreshTokenEnum.InvalidToken:
          return createResponseBadRequest(RefreshTokenEnum.InvalidToken)
        default:
          return createResponseSuccess(RefreshTokenEnum.Success)
      }
    } catch (error: any) {
      return createResponseInternalServerError(error)
    }
  }
}
