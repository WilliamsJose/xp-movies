import { AddNewUserFavoriteEnum } from '../enums/AddNewUserFavoriteEnum'
import { IUserMovie } from '../domains/entities'
import {
  ICategoryRepository,
  IMovieCategoryRepository,
  IMovieRepository,
  IUserMovieRepository,
  IUserRepository
} from '../domains/repositories'
import { IUseCase } from '../domains/useCases/IUseCase'

export class AddNewUserFavoriteUseCase implements IUseCase {
  constructor(
    private userRepository: IUserRepository,
    private movieRepository: IMovieRepository,
    private categoryRepository: ICategoryRepository,
    private movieCategoryRepository: IMovieCategoryRepository,
    private userMovieRepository: IUserMovieRepository
  ) {}

  async execute(
    userId: number,
    imdbId: string,
    categoriesIds: number[],
    title: string
  ): Promise<IUserMovie | AddNewUserFavoriteEnum | undefined> {
    if (!userId || !imdbId || Array(categoriesIds).length < 1 || !title) return AddNewUserFavoriteEnum.InvalidParameters

    const user = await this.userRepository.getById(userId)

    if (!user) return AddNewUserFavoriteEnum.UserNotFound

    let movie = await this.movieRepository.getByImdb(imdbId)
    if (!movie) {
      movie = await this.movieRepository.save(imdbId, title)
    }

    const categories = await this.categoryRepository.getManyByIds(categoriesIds)
    if (!categories || categories.length === 0) return AddNewUserFavoriteEnum.InvalidCategories

    let userMovie
    if (movie) {
      await this.movieCategoryRepository.save(movie, categories)
      userMovie = await this.userMovieRepository.save(user, movie)
    }

    return userMovie
  }
}
