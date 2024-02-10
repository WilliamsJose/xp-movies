import { DeleteUserFavoriteEnum } from '../enums/DeleteUserFavoriteEnum'
import { createResponseBadRequest, createResponseNoContent } from '../helpers/apiResponse'
import { IController } from '../domains/controllers'
import { IUseCase } from '../domains/useCases/IUseCase'

export class DeleteUserFavoriteController implements IController {
  constructor(private deleteUserFavoriteUseCase: IUseCase) {}

  async handle(request: any): Promise<any> {
    const { userMovieId } = request.params

    try {
      const result = await this.deleteUserFavoriteUseCase.execute(userMovieId)
      switch (result) {
        case DeleteUserFavoriteEnum.InvalidParameters:
          return createResponseBadRequest(DeleteUserFavoriteEnum.InvalidParameters)
        default:
          return createResponseNoContent(null, result)
      }
    } catch (error: any) {
      return createResponseBadRequest(error)
    }
  }
}
