import { createResponseInternalServerError } from '../helpers/apiResponse'
import { IController } from '../domains/controllers'
import { IUseCase } from '../domains/useCases/IUseCase'
import { mapResponseToHTTP } from '../utils/mapResponseToHTTP'

export class AddNewUserFavoriteController implements IController {
  constructor(private addNewUserFavoriteUseCase: IUseCase) {}

  async handle(request: any): Promise<any> {
    const { userId } = request.query
    const { imdbId, categoriesIds, title } = request.body

    try {
      const result = await this.addNewUserFavoriteUseCase.execute(userId, imdbId, categoriesIds, title)
      return mapResponseToHTTP(result)
    } catch (error: any) {
      return createResponseInternalServerError(error)
    }
  }
}
