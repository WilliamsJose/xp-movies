import { HTTPStatusCode } from '../enums'
import { IController } from '../interfaces/controllers'
import { IUserMovieRepository } from '../interfaces/repositories'

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
