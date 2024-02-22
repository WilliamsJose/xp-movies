import { createResponseInternalServerError } from '../helpers/apiResponse'
import { IController, IControllerResponse } from '../domains/controllers'
import { IUseCase } from '../domains/useCases/IUseCase'
import { mapResponseToHTTP } from '../utils/mapResponseToHTTP'

export class DeleteUserFavoriteController implements IController {
  constructor(private deleteUserFavoriteUseCase: IUseCase) {}

  async handle(request: any): Promise<IControllerResponse> {
    const { userMovieId } = request.params
    const { authorization: accessToken } = request.headers

    try {
      const result = await this.deleteUserFavoriteUseCase.execute(userMovieId, accessToken)
      return mapResponseToHTTP(result)
    } catch (error: any) {
      return createResponseInternalServerError(error)
    }
  }
}
