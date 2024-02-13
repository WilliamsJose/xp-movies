import { IMovieRepository, IUserMovieRepository } from '../domains/repositories'
import { IUseCase } from '../domains/useCases/IUseCase'
import { IUseCaseResult } from '../domains/useCases/IUseCaseResult'
import { UseCaseResponsesEnum } from '../enums/UseCaseResponsesEnum'

export class FindAllUserFavoritesUseCase implements IUseCase {
  constructor(
    private userMovieRepository: IUserMovieRepository,
    private moviesRepository: IMovieRepository
  ) {}

  async execute(userId: number): Promise<IUseCaseResult> {
    try {
      if (!userId) {
        return {
          code: UseCaseResponsesEnum.InvalidParameters,
          body: 'Missing param: userId.'
        }
      }

      const userMovies = await this.userMovieRepository.getByUserId(+userId)

      return {
        code: UseCaseResponsesEnum.Success,
        body: { favorites: userMovies }
      }
    } catch (error) {
      return {
        code: UseCaseResponsesEnum.InvalidUser,
        body: 'User not found on database.'
      }
    }
  }
}
