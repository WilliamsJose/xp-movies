import { createResponseInternalServerError } from '../helpers/apiResponse'
import { IController } from '../domains/controllers'
import { IUseCase } from '../domains/useCases/IUseCase'
import { Get, Route, Request, Header } from 'tsoa'
import { IControllerResponse } from '../domains/controllers/IControllerResponse'
import { mapResponseToHTTP } from '../utils/mapResponseToHTTP'

@Route('token/refresh')
export class RefreshTokenController implements IController {
  constructor(private refreshTokenUseCase: IUseCase) {}

  @Get()
  async handle(@Header('refreshtoken') @Request() request: any): Promise<IControllerResponse> {
    const { refreshtoken: refreshToken } = request.headers

    try {
      const result = await this.refreshTokenUseCase.execute(refreshToken)
      return mapResponseToHTTP(result)
    } catch (error: any) {
      return createResponseInternalServerError(error)
    }
  }
}
