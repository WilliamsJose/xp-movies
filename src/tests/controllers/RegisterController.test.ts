import { RegisterController } from '../../controllers'
import { IUseCase } from '../../domains/useCases/IUseCase'

describe('RegisterController:', () => {
  it('should call execute with correct parameters', async () => {
    const name = 'will'
    const email = 'will@mail.com'
    const password = '123'
    const request = {
      body: {
        name,
        email,
        password
      }
    }
    const useCaseMock: IUseCase = {
      execute: jest.fn()
    }

    const controller = new RegisterController(useCaseMock)
    await controller.handle(request)

    expect(useCaseMock.execute).toHaveBeenCalledWith(name, email, password)
  })
})
