import { createResponseInternalServerError } from '../helpers/apiResponse'
import { IController } from '../domains/controllers'
import { IUseCase } from '../domains/useCases/IUseCase'
import { mapResponseToHTTP } from '../utils/mapResponseToHTTP'
import { IControllerResponse } from '../domains/controllers/IControllerResponse'

export class AddNewUserFavoriteController implements IController {
  constructor(private addNewUserFavoriteUseCase: IUseCase) {}

  /**
   * Add new favorite movie to this user.
   * @param request - with the user access token and movie data.
   * @returns - The newly added favorite movie.
   * @description
   * This function use access token and body data to add new user favorite movie related to access token.
   */
  async handle(request: any): Promise<IControllerResponse> {
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
