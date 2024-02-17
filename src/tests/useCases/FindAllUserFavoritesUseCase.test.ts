import { IMovieRepository, IUserMovieRepository } from '../../domains/repositories'
import { FindAllUserFavoritesUseCase } from '../../useCases'
import { UseCaseResponsesEnum } from '../../enums/UseCaseResponsesEnum'

describe('FindAllUserFavoritesUseCase: testing all possible responses', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return invalid parameters if userId not provided', async () => {
    const useCase = new FindAllUserFavoritesUseCase({} as IUserMovieRepository, {} as IMovieRepository)

    const result = await useCase.execute(Number())

    expect(result.code).toBe(UseCaseResponsesEnum.InvalidParameters)
    expect(result.body).toBe('Missing param: userId.')
  })

  it('should return userMovies by userId', async () => {
    const userMovie = {
      id: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user: undefined,
      movie: undefined
    }
    const userMovieRepositoryMock: IUserMovieRepository = {
      getByUserId: jest.fn().mockResolvedValue([userMovie]),
      deleteByUserMovieId: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      save: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }
    const useCase = new FindAllUserFavoritesUseCase(userMovieRepositoryMock, {} as IMovieRepository)

    const result = await useCase.execute(1)

    expect(result.code).toBe(UseCaseResponsesEnum.Success)
    expect(result.body).toStrictEqual({ favorites: [userMovie] })
  })

  it('should return invalidUser if user not found by userId', async () => {
    const useCase = new FindAllUserFavoritesUseCase({} as IUserMovieRepository, {} as IMovieRepository)

    const result = await useCase.execute(1)

    expect(result.code).toBe(UseCaseResponsesEnum.InvalidUser)
    expect(result.body).toBe('User not found on database.')
  })
})
