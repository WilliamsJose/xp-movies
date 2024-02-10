import { createResponseBadRequest } from '../helpers/apiResponse'
import { IController } from '../domains/controllers'
import { IUseCase } from '../domains/useCases/IUseCase'
import { mapResponseToHTTP } from '../utils/mapResponseToHTTP'

export class DeleteUserFavoriteController implements IController {
  constructor(private deleteUserFavoriteUseCase: IUseCase) {}

  async handle(request: any): Promise<any> {
    const { userMovieId } = request.params

    try {
      const result = await this.deleteUserFavoriteUseCase.execute(userMovieId)
      return mapResponseToHTTP(result)
    } catch (error: any) {
      return createResponseBadRequest(error)
    }
  }
}
