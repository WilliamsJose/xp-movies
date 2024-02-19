import { AuthController } from '../../src/controllers'
import { IUseCase } from '../../src/domains/useCases/IUseCase'
import { HTTPStatusCode } from '../../src/enums'
import { UseCaseResponsesEnum } from '../../src/enums/UseCaseResponsesEnum'

describe('AuthController: testing all responses', () => {
  it('should perform user login successfully and return Access Token and Refresh Token on header', async () => {
    const authUseCaseMock = {
      execute: jest.fn().mockResolvedValue({
        code: UseCaseResponsesEnum.Success,
        body: {
          message: 'User logged in successfully!'
        },
        headers: {
          'Access-Token': '123',
          'Refresh-Token': '321'
        }
      })
    }

    const authController = new AuthController(authUseCaseMock)

    const request = {
      body: {
        email: 'test@example.com',
        password: 'password'
      }
    }

    const response = await authController.handle(request)

    expect(response.status).toBe(HTTPStatusCode.OK)
    expect(response.headers).toEqual({
      'Access-Token': '123',
      'Refresh-Token': '321'
    })
    expect(response.body).toEqual({ message: 'User logged in successfully!' })
  })

  it('should handle errors thrown by execute() and return appropriate HTTP response', async () => {
    const error = new Error('Some error')
    const authUseCaseMock: IUseCase = {
      execute: jest.fn().mockRejectedValue(error)
    }
    const authController = new AuthController(authUseCaseMock)

    const request = {
      body: {
        email: 'will@mail.com',
        password: '123'
      }
    }

    const response = await authController.handle(request)

    expect(response.status).toBe(HTTPStatusCode.InternalServerError)
    expect(response.headers).toBeUndefined()
    expect(response.body).toEqual(error)
  })

  it('should handle invalid request body and return Bad Request HTTP response', async () => {
    const authUseCaseMock: IUseCase = {
      execute: jest.fn()
    }
    const authController = new AuthController(authUseCaseMock)

    const request = {
      body: null
    }
    const response = await authController.handle(request)

    expect(response.status).toBe(HTTPStatusCode.BadRequest)
    expect(response.headers).toBeUndefined()
    expect(response.body).toEqual({ message: 'Missing body!' })
  })

  it('should handle missing email or password in request body and return Bad Request HTTP response', async () => {
    const authUseCaseMock = {
      execute: jest.fn()
    }
    const authController = new AuthController(authUseCaseMock)

    const request = {
      body: {}
    }
    const response = await authController.handle(request)

    expect(response.status).toBe(HTTPStatusCode.BadRequest)
    expect(response.headers).toBeUndefined()
    expect(response.body).toEqual({ message: 'Missing params: email or password!' })
  })
})
