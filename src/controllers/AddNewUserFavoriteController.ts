import {
  createResponseBadRequest,
  createResponseInternalServerError,
  createResponseNotFound,
  createResponseSuccess,
  createResponseUnauthorized
} from '../helpers/apiResponse'
import { IController } from '../domains/controllers'
import { IUseCase } from '../domains/useCases/IUseCase'
import { UseCasesEnum } from '../enums/UseCasesEnum'
import { IUseCaseResult } from '../domains/useCases/IUseCaseResult'

export class AddNewUserFavoriteController implements IController {
  constructor(private addNewUserFavoriteUseCase: IUseCase) {}

  async handle(request: any): Promise<any> {
    const { userId } = request.query
    const { imdbId, categoriesIds, title } = request.body

    try {
      const data: IUseCaseResult = await this.addNewUserFavoriteUseCase.execute(userId, imdbId, categoriesIds, title)
      switch (data?.errors?.code) {
        case UseCasesEnum.InvalidParameters:
          return createResponseBadRequest(data.errors.message)
        case UseCasesEnum.InvalidCategories:
          return createResponseBadRequest(data.errors.message)
        case UseCasesEnum.UserNotFound:
          return createResponseNotFound(data.errors.message)
        case UseCasesEnum.UserNotRegistered:
          return createResponseUnauthorized(data.errors.message)
        default:
          return createResponseSuccess(data.result)
      }
    } catch (error: any) {
      return createResponseInternalServerError(error)
    }
  }
}
