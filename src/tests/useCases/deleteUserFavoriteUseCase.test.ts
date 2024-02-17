import { IUserMovieRepository } from '../../domains/repositories'
import { UseCaseResponsesEnum } from '../../enums/UseCaseResponsesEnum'
import { DeleteUserFavoriteUseCase } from '../../useCases'

describe('DeleteUserFavoriteUseCase: testing all possible response', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return invalid parameters if userMovieId not provided', async () => {
    const deleteUserFavoriteUseCase = new DeleteUserFavoriteUseCase({} as IUserMovieRepository)

    const result = await deleteUserFavoriteUseCase.execute(Number())

    expect(result.code).toBe(UseCaseResponsesEnum.InvalidParameters)
    expect(result.body).toBe('Missing param: userMovieId.')
  })

  it('should delete a user favorite movie when given a valid userMovieId', async () => {
    const userMovieRepositoryMock: IUserMovieRepository = {
      deleteByUserMovieId: jest.fn().mockResolvedValue({ affected: 1 }),
      getByUserId: jest.fn().mockRejectedValue(new Error('Funcion not implemented.')),
      save: jest.fn().mockRejectedValue(new Error('Funcion not implemented.'))
    }

    const deleteUserFavoriteUseCase = new DeleteUserFavoriteUseCase(userMovieRepositoryMock)

    const result = await deleteUserFavoriteUseCase.execute(1)

    expect(result.code).toBe(UseCaseResponsesEnum.DBDeleted)
    expect(result.headers).toStrictEqual({ affected: 1 })
  })

  it('should not delete when id not found', async () => {
    const userMovieRepositoryMock: IUserMovieRepository = {
      deleteByUserMovieId: jest.fn().mockResolvedValue({ affected: 0 }),
      getByUserId: jest.fn().mockRejectedValue(new Error('Funcion not implemented.')),
      save: jest.fn().mockRejectedValue(new Error('Funcion not implemented.'))
    }

    const deleteUserFavoriteUseCase = new DeleteUserFavoriteUseCase(userMovieRepositoryMock)

    const result = await deleteUserFavoriteUseCase.execute(-1)

    expect(result.code).toBe(UseCaseResponsesEnum.DBDeleted)
    expect(result.headers).toStrictEqual({ affected: 0 })
  })
})
