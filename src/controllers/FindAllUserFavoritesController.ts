import { FindAllUserFavoritesEnum } from '../enums/FindAllUserFavoritesEnum'
import {
  createResponseBadRequest,
  createResponseInternalServerError,
  createResponseNotFound,
  createResponseSuccess
} from '../helpers/apiResponse'
import { IController } from '../interfaces/controllers'
import { IUseCase } from '../interfaces/useCases/IUseCase'

export class FindAllUserFavoritesController implements IController {
  constructor(private findAllUserFavoriteUseCase: IUseCase) {}

  async handle(request: any): Promise<any> {
    const { userId } = request.query

    try {
      const result = await this.findAllUserFavoriteUseCase.execute(userId)

      switch (result) {
        case FindAllUserFavoritesEnum.InvalidParameters:
          return createResponseBadRequest(FindAllUserFavoritesEnum.InvalidParameters)
        case FindAllUserFavoritesEnum.InvalidUser:
          return createResponseNotFound(FindAllUserFavoritesEnum.InvalidUser)
        default:
          return createResponseSuccess({ favorites: result })
      }
    } catch (error: any) {
      return createResponseInternalServerError(error)
    }
  }
}
