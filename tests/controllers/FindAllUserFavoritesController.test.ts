import { FindAllUserFavoritesController } from '../../src/controllers'
import { IUseCase } from '../../src/domains/useCases/IUseCase'

describe('FindAllUserFavoritesController: testing all responses', () => {
  it('should call execute and return apropriate http response with no favorites', async () => {
    const userId = '123'
    const request = { query: { userId } }
    const findAllUserFavoriteUseCaseMock: IUseCase = {
      execute: jest.fn()
    }

    const controller = new FindAllUserFavoritesController(findAllUserFavoriteUseCaseMock)
    await controller.handle(request)

    expect(findAllUserFavoriteUseCaseMock.execute).toHaveBeenCalledWith(userId)
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
