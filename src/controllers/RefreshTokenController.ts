import { RefreshTokenEnum } from '../enums/RefreshTokenEnum'
import {
  createResponseBadRequest,
  createResponseInternalServerError,
  createResponseSuccess
} from '../helpers/apiResponse'
import { IController } from '../domains/controllers'
import { IUseCase } from '../domains/useCases/IUseCase'

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
          return createResponseSuccess(RefreshTokenEnum.Success, { Authorization: result })
      }
    } catch (error: any) {
      return createResponseInternalServerError(error)
    }
  }
}
