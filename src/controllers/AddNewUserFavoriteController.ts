import { AddNewUserFavoriteEnum } from '../enums'
import {
  createResponseBadRequest,
  createResponseInternalServerError,
  createResponseNotFound,
  createResponseSuccess,
  createResponseUnauthorized
} from '../helpers/apiResponse'
import { IController } from '../domains/controllers'
import { IUseCase } from '../domains/useCases/IUseCase'

export class AddNewUserFavoriteController implements IController {
  constructor(private addNewUserFavoriteUseCase: IUseCase) {}

  async handle(request: any): Promise<any> {
    const { userId } = request.query
    const { imdbId, categoriesIds, title } = request.body

    try {
      const result = await this.addNewUserFavoriteUseCase.execute(userId, imdbId, categoriesIds, title)

      switch (result) {
        case AddNewUserFavoriteEnum.InvalidCategories:
          return createResponseBadRequest(AddNewUserFavoriteEnum.InvalidCategories)
        case AddNewUserFavoriteEnum.InvalidParameters:
          return createResponseBadRequest(AddNewUserFavoriteEnum.InvalidParameters)
        case AddNewUserFavoriteEnum.UserNotFound:
          return createResponseNotFound(AddNewUserFavoriteEnum.UserNotFound)
        case AddNewUserFavoriteEnum.UserNotRegistered:
          return createResponseUnauthorized(AddNewUserFavoriteEnum.UserNotRegistered)
        default:
          return createResponseSuccess(result)
      }
    } catch (error: any) {
      return createResponseInternalServerError(error)
    }
  }
}
