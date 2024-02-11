import { RefreshTokenEnum } from '../enums/RefreshTokenEnum'
import {
  createResponseBadRequest,
  createResponseInternalServerError,
  createResponseSuccess
} from '../helpers/apiResponse'
import { IController } from '../domains/controllers'
import { IUseCase } from '../domains/useCases/IUseCase'
import { HTTPStatusCode } from '../enums'
import { Get, Route, Request, Header } from 'tsoa'

interface RefreshTokenControllerResponse {
  status: HTTPStatusCode
  headers: any
  body: any
}

@Route('token/refresh')
export class RefreshTokenController implements IController {
  constructor(private refreshTokenUseCase: IUseCase) {}

  @Get()
  async handle(@Header('refreshtoken') @Request() request: any): Promise<RefreshTokenControllerResponse> {
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
