import { IUserTokenRepository } from '../../domains/repositories'
import { UseCaseResponsesEnum } from '../../enums/UseCaseResponsesEnum'
import { RefreshTokenUseCase } from '../../useCases'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

describe('RefreshTokenUseCase: testing all possible responses', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return invalid parameters if token not provided', async () => {
    const useCase = new RefreshTokenUseCase({} as IUserTokenRepository)

    const result = await useCase.execute(String())

    expect(result.code).toBe(UseCaseResponsesEnum.InvalidParameters)
    expect(result.body).toBe('Missing Param: refreshToken.')
  })

  it('should return auth token if valid refreshtoken provided', async () => {
    const validRefreshToken = jwt.sign({ id: 1 }, process.env.REFRESH_SECRET || '123', {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '60s'
    })

    const validAccessToken = jwt.sign({ id: 1 }, process.env.ACCESS_SECRET || '123', {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '60s'
    })

    const userTokenRepo: IUserTokenRepository = {
      findRefreshToken: jest.fn().mockResolvedValue(validRefreshToken),
      getByUserId: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      update: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      save: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const useCase = new RefreshTokenUseCase(userTokenRepo)

    const result = await useCase.execute(validRefreshToken)

    expect(result.code).toBe(UseCaseResponsesEnum.Success)
    expect(result.body).toBe('New access token generated!')
    expect(result.headers).toStrictEqual({ Authorization: validAccessToken })
  })

  it('should return auth token if valid refreshtoken provided even if not have env vars', async () => {
    process.env = {}

    const validRefreshToken = jwt.sign({ id: 1 }, process.env.REFRESH_SECRET || '123', {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '60s'
    })

    const validAccessToken = jwt.sign({ id: 1 }, process.env.ACCESS_SECRET || '123', {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '60s'
    })

    const userTokenRepo: IUserTokenRepository = {
      findRefreshToken: jest.fn().mockResolvedValue(validRefreshToken),
      getByUserId: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      update: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      save: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }
    const useCase = new RefreshTokenUseCase(userTokenRepo)

    const result = await useCase.execute(validRefreshToken)

    expect(result.code).toBe(UseCaseResponsesEnum.Success)
    expect(result.body).toBe('New access token generated!')
    expect(result.headers).toStrictEqual({ Authorization: validAccessToken })
  })

  it('should return invalid token message if invalid refreshtoken provided', async () => {
    const useCase = new RefreshTokenUseCase({} as IUserTokenRepository)

    const result = await useCase.execute('abs123')

    expect(result.code).toBe(UseCaseResponsesEnum.InvalidToken)
    expect(result.body).toBe('Invalid token provided.')
  })
})
