import { DeleteUserFavoriteController } from '../../controllers'
import { IUseCase } from '../../domains/useCases/IUseCase'
import { UseCaseResponsesEnum } from '../../enums/UseCaseResponsesEnum'

describe('DeleteUserFavoriteController: testing all responses', () => {
  it('should call execute and return apropriate http response', async () => {
    const userMovieId = 1
    const request = { params: { userMovieId } }
    const useCaseResult = { code: UseCaseResponsesEnum.Success, headers: { affected: 1 } }
    const deleteUserFavoriteUseCaseMock: IUseCase = {
      execute: jest.fn().mockResolvedValue(useCaseResult)
    }

    const controller = new DeleteUserFavoriteController(deleteUserFavoriteUseCaseMock)
    const result = await controller.handle(request)

    expect(deleteUserFavoriteUseCaseMock.execute).toHaveBeenCalledWith(userMovieId)
    expect(result).toEqual({ status: 200, headers: { affected: 1 }, body: undefined })
  })

  it('should call execute and return internal server error http response', async () => {
    const userMovieId = 1
    const request = { params: { userMovieId } }
    const error = new Error('Internal Server Error')
    const deleteUserFavoriteUseCaseMock = {
      execute: jest.fn().mockRejectedValue(error)
    }

    const controller = new DeleteUserFavoriteController(deleteUserFavoriteUseCaseMock)
    const result = await controller.handle(request)

    expect(deleteUserFavoriteUseCaseMock.execute).toHaveBeenCalledWith(userMovieId)
    expect(result).toEqual({ status: 500, headers: undefined, body: error })
  })
})
