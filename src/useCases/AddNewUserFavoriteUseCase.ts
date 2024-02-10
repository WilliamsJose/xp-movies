import {
  ICategoryRepository,
  IMovieCategoryRepository,
  IMovieRepository,
  IUserMovieRepository,
  IUserRepository
} from '../domains/repositories'
import { IUseCase } from '../domains/useCases/IUseCase'
import { IUseCaseResult } from '../domains/useCases/IUseCaseResult'
import { UseCasesEnum } from '../enums/UseCasesEnum'

export class AddNewUserFavoriteUseCase implements IUseCase {
  constructor(
    private userRepository: IUserRepository,
    private movieRepository: IMovieRepository,
    private categoryRepository: ICategoryRepository,
    private movieCategoryRepository: IMovieCategoryRepository,
    private userMovieRepository: IUserMovieRepository
  ) {}

  async execute(userId: number, imdbId: string, categoriesIds: number[], title: string): Promise<IUseCaseResult> {
    if (!userId || !imdbId || Array(categoriesIds).length < 1 || !title) {
      return {
        code: UseCasesEnum.InvalidParameters,
        message: 'Missing params: userId, imdbId, categoriesIds or title.'
      }
    }

    const user = await this.userRepository.getById(userId)

    if (!user) {
      return {
        code: UseCasesEnum.UserNotFound,
        message: 'User not found on database.'
      }
    }

    let movie = await this.movieRepository.getByImdb(imdbId)
    if (!movie) {
      movie = await this.movieRepository.save(imdbId, title)
    }

    const categories = await this.categoryRepository.getManyByIds(categoriesIds)
    if (!categories || categories.length === 0) {
      return {
        code: UseCasesEnum.InvalidCategories,
        message: 'Invalid categories.'
      }
    }

    let userMovie
    if (movie) {
      await this.movieCategoryRepository.save(movie, categories)
      userMovie = await this.userMovieRepository.save(user, movie)
    }

    return {
      code: UseCasesEnum.Success,
      data: userMovie
    }
  }
}