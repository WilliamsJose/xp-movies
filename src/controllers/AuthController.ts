import { IController, IControllerResponse } from '../domains/controllers'
import { createResponseInternalServerError } from '../helpers/apiResponse'
import { IUseCase } from '../domains/useCases/IUseCase'
import { mapResponseToHTTP } from '../utils/mapResponseToHTTP'
import { HTTPStatusCode } from '../enums'

export class AuthController implements IController {
  constructor(private authUseCase: IUseCase) {}

  /**
   * Performs user login.
   * @param {string} request - With the user email and password on body.
   * @returns {string} - The newly generated Access Token and Refresh Token on header.
   * @description
   * This function performs login taking a email and password as input and generates a new Access Token and Refresh Token.
   */
  async handle(request: any): Promise<IControllerResponse> {
    if (!request.body) {
      return {
        status: HTTPStatusCode.BadRequest,
        body: { message: 'Missing body!' }
      }
    }

    const { email, password } = request.body

    if (!email || !password) {
      return {
        status: HTTPStatusCode.BadRequest,
        body: { message: 'Missing params: email or password!' }
      }
    }

    try {
      const result = await this.authUseCase.execute(email, password)
      return mapResponseToHTTP(result)
    } catch (error: any) {
      return createResponseInternalServerError(error)
    }
  }
}
