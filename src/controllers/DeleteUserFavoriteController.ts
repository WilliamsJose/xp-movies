import { HTTPStatusCode } from '../enums'
import { IController } from '../interfaces/controllers'
import { IUserMovieRepository } from '../interfaces/repositories'

export class DeleteUserFavoriteController implements IController {
  constructor(private userMovieRepository: IUserMovieRepository) {}

  async handle(request: any): Promise<any> {
    const { userMovieId } = request.params

    try {
      if (!userMovieId) {
        return {
          status: HTTPStatusCode.BadRequest,
          body: {
            message: 'You must provide an userMovieId'
          }
        }
      }

      const deleted = await this.userMovieRepository.deleteByUserMovieId(+userMovieId)

      return {
        status: HTTPStatusCode.NoContent,
        body: {
          deleted
        }
      }
    } catch (error: any) {
      return {
        status: HTTPStatusCode.InternalServerError,
        body: {
          message: error
        }
      }
    }
  }
}
