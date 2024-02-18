import { createResponseInternalServerError } from '../helpers/apiResponse'
import { IController, IControllerResponse } from '../domains/controllers'
import { IUseCase } from '../domains/useCases/IUseCase'
import { mapResponseToHTTP } from '../utils/mapResponseToHTTP'

export class FindAllUserFavoritesController implements IController {
  constructor(private findAllUserFavoriteUseCase: IUseCase) {}

  async handle(request: any): Promise<IControllerResponse> {
    const { userId } = request.query

    try {
      const result = await this.findAllUserFavoriteUseCase.execute(userId)
      return mapResponseToHTTP(result)
    } catch (error: any) {
      return createResponseInternalServerError(error)
    }
  }
}
