import { IUserRepository, IUserTokenRepository } from '../../domains/repositories'
import { UseCaseResponsesEnum } from '../../enums/UseCaseResponsesEnum'
import { AuthUseCase } from '../../useCases'
import bcrypt from 'bcrypt'

describe('AuthUseCase: testing all possible response', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fail login with email and clear password', async () => {
    const userRepositoryMock: IUserRepository = {
      getById: jest.fn().mockRejectedValue(new Error('Funcion not implemented.')),
      getByEmail: jest.fn().mockResolvedValue({
        id: 1,
        name: 'Will',
        email: 'will@mail.com',
        password: '123',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }),
      save: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const userTokenRepository: IUserTokenRepository = {
      findRefreshToken: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      getByUserId: jest.fn().mockResolvedValue({
        id: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTcwNzg2Mzk5MywiZXhwIjoxNzA4NDY4NzkzfQ.Sj-SD_pPEWQaGARUbQWi1c1EfuqFnqs3HGi8QD7mfNA',
        user: undefined
      }),
      update: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      save: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const result = await new AuthUseCase(userRepositoryMock, userTokenRepository).execute('will@mail.com', '123')

    expect(result.code).toBe(UseCaseResponsesEnum.InvalidCredentials)
    expect(result.body).toBe('Wrong Email or Password!')
  })

  it('should make successfull login with email and password', async () => {
    const encrypted = await bcrypt.hash('123', 12)

    const userRepositoryMock: IUserRepository = {
      getById: jest.fn().mockRejectedValue(new Error('Funcion not implemented.')),
      getByEmail: jest.fn().mockResolvedValue({
        id: 1,
        name: 'Will',
        email: 'will@mail.com',
        password: encrypted,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }),
      save: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const userTokenRepository: IUserTokenRepository = {
      findRefreshToken: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      getByUserId: jest.fn().mockResolvedValue({
        id: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTcwNzg2Mzk5MywiZXhwIjoxNzA4NDY4NzkzfQ.Sj-SD_pPEWQaGARUbQWi1c1EfuqFnqs3HGi8QD7mfNA',
        user: undefined
      }),
      update: jest.fn().mockResolvedValue(1),
      save: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const result = await new AuthUseCase(userRepositoryMock, userTokenRepository).execute('will@mail.com', '123')

    expect(result.code).toBe(UseCaseResponsesEnum.Success)
    expect(result.body).toBe('User logged in successfully!')
  })
})
