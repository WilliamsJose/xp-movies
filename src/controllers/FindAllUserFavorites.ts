import { HTTPStatusCode } from '../enums/HTTPStatusCode'
import { IController } from '../interfaces/controllers/IController'
import { IUserMovieRepository } from '../interfaces/repositories/IUserMovieRepository'

export class FindAllUserFavorites implements IController {
  constructor(private userMovieRepository: IUserMovieRepository) {}

  async handle(request: any): Promise<any> {
    const { userId } = request.query

    try {
      if (!userId) {
        return {
          status: HTTPStatusCode.BadRequest,
          body: {
            message: 'You must provide an userId'
          }
        }
      }

      const userFavorites = await this.userMovieRepository.getByUserId(+userId)

      return {
        status: HTTPStatusCode.OK,
        body: {
          userId,
          userFavorites
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
