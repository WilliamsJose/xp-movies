import { FindAllUserFavoritesController } from '../../controllers'
import { IUseCase } from '../../domains/useCases/IUseCase'
import { UseCaseResponsesEnum } from '../../enums/UseCaseResponsesEnum'

describe('FindAllUserFavoritesController: testing all responses', () => {
  it('should call execute and return apropriate http response with no favorites', async () => {
    const userId = '123'
    const request = { query: { userId } }
    const useCaseResult = { code: UseCaseResponsesEnum.Success, body: { favorites: [] }, headers: undefined }
    const findAllUserFavoriteUseCaseMock: IUseCase = {
      execute: jest.fn().mockResolvedValue(useCaseResult)
    }

    const controller = new FindAllUserFavoritesController(findAllUserFavoriteUseCaseMock)
    const result = await controller.handle(request)

    expect(findAllUserFavoriteUseCaseMock.execute).toHaveBeenCalledWith(userId)
    expect(result).toEqual({ status: 200, headers: undefined, body: { favorites: [] } })
  })

  it('should call execute and return internal server error http response', async () => {
    const userId = '789'
    const request = { query: { userId } }
    const error = new Error('Internal Server Error')
    const findAllUserFavoriteUseCaseMock: IUseCase = {
      execute: jest.fn().mockRejectedValue(error)
    }

    const controller = new FindAllUserFavoritesController(findAllUserFavoriteUseCaseMock)
    const result = await controller.handle(request)

    expect(findAllUserFavoriteUseCaseMock.execute).toHaveBeenCalledWith(userId)
    expect(result).toEqual({ status: 500, headers: undefined, body: error })
  })
})
