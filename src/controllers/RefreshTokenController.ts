import { createResponseInternalServerError } from '../helpers/apiResponse'
import { IController } from '../domains/controllers'
import { IUseCase } from '../domains/useCases/IUseCase'
import { IControllerResponse } from '../domains/controllers/IControllerResponse'
import { mapResponseToHTTP } from '../utils/mapResponseToHTTP'

export class RefreshTokenController implements IController {
  constructor(private refreshTokenUseCase: IUseCase) {}

  /**
   * Generates a new Access Token from a Refresh Token.
   * @param {string} refreshtoken - The Refresh Token used to generate the new Access Token.
   * @returns {string} - The newly generated Access Token.
   * @description
   * This function takes a Refresh Token as input and generates a new Access Token.
   * It is used to refresh the authentication session without requiring the user to log in again.
   */
  async handle(request: any): Promise<IControllerResponse> {
    const { refreshtoken: refreshToken } = request.headers

    try {
      const result = await this.refreshTokenUseCase.execute(refreshToken)
      return mapResponseToHTTP(result)
    } catch (error: any) {
      return createResponseInternalServerError(error)
    }
  }
}
