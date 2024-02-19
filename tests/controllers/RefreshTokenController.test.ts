import { RefreshTokenController } from '../../src/controllers'
import { IUseCase } from '../../src/domains/useCases/IUseCase'

describe('RefreshTokenController:', () => {
  it('should call execute with correct parameters', async () => {
    const request = {
      headers: { refreshtoken: 'abc123' }
    }
    const useCaseMock: IUseCase = {
      execute: jest.fn()
    }

    const controller = new RefreshTokenController(useCaseMock)
    await controller.handle(request)

    expect(useCaseMock.execute).toHaveBeenCalledWith(request.headers.refreshtoken)
  })
})
