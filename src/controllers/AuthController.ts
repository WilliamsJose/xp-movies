import { IController } from '../domains/controllers'
import { createResponseInternalServerError } from '../helpers/apiResponse'
import { IUseCase } from '../domains/useCases/IUseCase'
import { mapResponseToHTTP } from '../utils/mapResponseToHTTP'

export class AuthController implements IController {
  constructor(private authUseCase: IUseCase) {}

  /**
   * Performs user login.
   * @param {string} request - With the user email and password on body.
   * @returns {string} - The newly generated Access Token and Refresh Token on header.
   * @description
   * This function performs login taking a email and password as input and generates a new Access Token and Refresh Token.
   */
  async handle(request: any): Promise<any> {
    const { email, password } = request.body

    try {
      const result = await this.authUseCase.execute(email, password)
      return mapResponseToHTTP(result)
    } catch (error: any) {
      return createResponseInternalServerError(error)
    }
  }
}
