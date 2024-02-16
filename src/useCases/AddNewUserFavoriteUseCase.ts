import {
  ICategoryRepository,
  IMovieCategoryRepository,
  IMovieRepository,
  IUserMovieRepository,
  IUserRepository
} from '../domains/repositories'
import { IUseCase } from '../domains/useCases/IUseCase'
import { IUseCaseResult } from '../domains/useCases/IUseCaseResult'
import { UseCaseResponsesEnum } from '../enums/UseCaseResponsesEnum'

export class AddNewUserFavoriteUseCase implements IUseCase {
  constructor(
    private userRepository: IUserRepository,
    private movieRepository: IMovieRepository,
    private categoryRepository: ICategoryRepository,
    private movieCategoryRepository: IMovieCategoryRepository,
    private userMovieRepository: IUserMovieRepository
  ) {}

  async execute(userId: number, imdbId: string, categoriesIds: number[], title: string): Promise<IUseCaseResult> {
    if (!userId || !imdbId || categoriesIds.length < 1 || !title) {
      return {
        code: UseCaseResponsesEnum.InvalidParameters,
        body: 'Missing params: userId, imdbId, categoriesIds or title.'
      }
    }

    const user = await this.userRepository.getById(userId)

    if (!user) {
      return {
        code: UseCaseResponsesEnum.UserNotFound,
        body: 'User not found on database.'
      }
    }

    let movie = await this.movieRepository.getByImdb(imdbId)
    if (!movie) {
      movie = await this.movieRepository.save(imdbId, title)
    }

    const categories = await this.categoryRepository.getManyByIds(categoriesIds)
    if (!categories || categories.length === 0) {
      return {
        code: UseCaseResponsesEnum.InvalidCategories,
        body: 'Invalid categories.'
      }
    }

    let userMovie
    if (movie) {
      await this.movieCategoryRepository.save(movie, categories)
      userMovie = await this.userMovieRepository.save(user, movie)
    }

    return {
      code: UseCaseResponsesEnum.Success,
      body: userMovie
    }
  }
}
