import { createResponseInternalServerError } from '../helpers/apiResponse'
import { IController } from '../domains/controllers'
import { IUseCase } from '../domains/useCases/IUseCase'
import { mapResponseToHTTP } from '../utils/mapResponseToHTTP'

export class RegisterController implements IController {
  constructor(private registerUseCase: IUseCase) {}

  async handle(request: any): Promise<any> {
    const { name, email, password } = request.body

    try {
      const result = await this.registerUseCase.execute(name, email, password)
      return mapResponseToHTTP(result)
    } catch (error) {
      return createResponseInternalServerError(error)
    }
  }
}
