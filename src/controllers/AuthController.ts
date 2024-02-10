import { IController } from '../domains/controllers'
import { createResponseInternalServerError } from '../helpers/apiResponse'
import { IUseCase } from '../domains/useCases/IUseCase'
import { mapResponseToHTTP } from '../utils/mapResponseToHTTP'

export class AuthController implements IController {
  constructor(private authUseCase: IUseCase) {}

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
