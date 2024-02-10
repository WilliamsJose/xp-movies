import { FindAllUserFavoritesEnum } from '../enums/FindAllUserFavoritesEnum'
import { IUserMovie } from '../domains/entities'
import { IMovieRepository, IUserMovieRepository } from '../domains/repositories'
import { IUseCase } from '../domains/useCases/IUseCase'

export class FindAllUserFavoritesUseCase implements IUseCase {
  constructor(
    private userMovieRepository: IUserMovieRepository,
    private moviesRepository: IMovieRepository
  ) {}

  async execute(userId: number): Promise<IUserMovie[] | FindAllUserFavoritesEnum | undefined> {
    try {
      if (!userId) return FindAllUserFavoritesEnum.InvalidParameters

      const userMovies = await this.userMovieRepository.getByUserId(+userId)

      return userMovies
    } catch (error) {
      return FindAllUserFavoritesEnum.InvalidUser
    }
  }
}
