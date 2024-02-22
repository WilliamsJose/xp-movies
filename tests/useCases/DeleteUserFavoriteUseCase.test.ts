import { IUserMovieRepository } from '../../src/domains/repositories'
import { UseCaseResponsesEnum } from '../../src/enums/UseCaseResponsesEnum'
import { DeleteUserFavoriteUseCase } from '../../src/useCases'
import jwt from 'jsonwebtoken'

describe('DeleteUserFavoriteUseCase: testing all possible response', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return invalid parameters if userMovieId or accessToken not provided', async () => {
    const deleteUserFavoriteUseCase = new DeleteUserFavoriteUseCase({} as IUserMovieRepository)

    const result = await deleteUserFavoriteUseCase.execute(Number(), String())

    expect(result.code).toBe(UseCaseResponsesEnum.InvalidParameters)
    expect(result.body).toBe('Missing params: userMovieId or Authorization.')
  })

  it('should delete a user favorite movie when given a valid userMovieId and accessToken', async () => {
    const userMovieRepositoryMock: IUserMovieRepository = {
      deleteByUserMovieId: jest.fn().mockResolvedValue({ affected: 1 }),
      getByUserId: jest.fn().mockRejectedValue(new Error('Funcion not implemented.')),
      save: jest.fn().mockRejectedValue(new Error('Funcion not implemented.'))
    }

    jest.spyOn(jwt, 'verify').mockImplementation(() => ({ id: '456' }))

    const deleteUserFavoriteUseCase = new DeleteUserFavoriteUseCase(userMovieRepositoryMock)

    const result = await deleteUserFavoriteUseCase.execute(1, 'tralala')

    expect(result.code).toBe(UseCaseResponsesEnum.DBDeleted)
    expect(result.headers).toStrictEqual({ affected: 1 })
    expect(userMovieRepositoryMock.deleteByUserMovieId).toHaveBeenCalledWith(1, '456')
  })

  it('should return invalid token if token provided is not valid', async () => {
    const userMovieRepositoryMock: IUserMovieRepository = {
      deleteByUserMovieId: jest.fn().mockResolvedValue({ affected: 1 }),
      getByUserId: jest.fn().mockRejectedValue(new Error('Funcion not implemented.')),
      save: jest.fn().mockRejectedValue(new Error('Funcion not implemented.'))
    }

    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error('Oops')
    })

    const deleteUserFavoriteUseCase = new DeleteUserFavoriteUseCase(userMovieRepositoryMock)

    const result = await deleteUserFavoriteUseCase.execute(1, 'tralala')

    expect(result.code).toBe(UseCaseResponsesEnum.InvalidToken)
    expect(result.headers).toStrictEqual(undefined)
    expect(userMovieRepositoryMock.deleteByUserMovieId).not.toHaveBeenCalled()
  })

  it('should return invalid parameters if userMovieId is negative', async () => {
    const deleteUserFavoriteUseCase = new DeleteUserFavoriteUseCase({} as IUserMovieRepository)

    const result = await deleteUserFavoriteUseCase.execute(-1, '123')

    expect(result.code).toBe(UseCaseResponsesEnum.InvalidParameters)
    expect(result.body).toStrictEqual('Invalid param: userMovieId must not be negative.')
  })
})
