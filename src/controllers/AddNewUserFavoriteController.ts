import { HTTPStatusCode } from '../enums/HTTPStatusCode'
import { IController } from '../interfaces/controllers/IController'
import { ICategoryRepository } from '../interfaces/repositories/ICategoryRepository'
import { IMovieCategoryRepository } from '../interfaces/repositories/IMovieCategoryRepository'
import { IMovieRepository } from '../interfaces/repositories/IMovieRepository'
import { IUserMovieRepository } from '../interfaces/repositories/IUserMovieRepository'
import { IUserRepository } from '../interfaces/repositories/IUserRepository'

export class AddNewUserFavoriteController implements IController {
  constructor(
    private userRepository: IUserRepository,
    private movieRepository: IMovieRepository,
    private categoryRepository: ICategoryRepository,
    private movieCategoryRepository: IMovieCategoryRepository,
    private userMovieRepository: IUserMovieRepository
  ) {}

  async handle(request: any): Promise<any> {
    const { userId } = request.query
    const { imdbId, categoriesIds, title } = request.body

    try {
      if (!userId) throw new Error('Missing param userId')

      const user = await this.userRepository.getById(+userId)

      // TODO implement cool validators
      if (!user) {
        return {
          status: HTTPStatusCode.BadRequest,
          body: {
            message: 'You must be registered to add an favorite.'
          }
        }
      }
      if (!imdbId || Array(categoriesIds).length < 1 || !title) {
        return {
          status: HTTPStatusCode.BadRequest,
          body: {
            message: 'You must provide an imdbId, categoriesIds and title.'
          }
        }
      }

      let movie = await this.movieRepository.getByImdb(imdbId)
      if (!movie) {
        movie = await this.movieRepository.save(imdbId, title)
      }

      const categories = await this.categoryRepository.getManyByIds(categoriesIds)
      if (!categories || categories.length === 0) {
        return {
          status: HTTPStatusCode.BadRequest,
          body: {
            message: 'Invalid categories.'
          }
        }
      }

      if (movie) {
        await this.movieCategoryRepository.save(movie, categories)
        await this.userMovieRepository.save(user, movie)
      }

      return {
        status: HTTPStatusCode.OK,
        body: {
          message: 'New favorite movie added!'
        }
      }
    } catch (error: any) {
      // TODO treat better and not return everything
      return {
        status: HTTPStatusCode.InternalServerError,
        body: {
          message: error
        }
      }
    }
  }
}
