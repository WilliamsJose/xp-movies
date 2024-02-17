import { IUserRepository, IUserTokenRepository } from '../../domains/repositories'
import { UseCaseResponsesEnum } from '../../enums/UseCaseResponsesEnum'
import { AuthUseCase } from '../../useCases'
import bcrypt from 'bcrypt'

const createUserRepositoryMock = (password: string) => {
  const encryptedPassword = password ? bcrypt.hashSync(password, 12) : ''
  return {
    getById: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
    getByEmail: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Will',
      email: 'will@mail.com',
      password: encryptedPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }),
    save: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
  }
}

const createUserTokenRepositoryMock = (refreshToken: string | undefined) => {
  return {
    findRefreshToken: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
    getByUserId: jest.fn().mockResolvedValue({
      id: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      refreshToken: refreshToken,
      user: undefined
    }),
    update: jest.fn().mockResolvedValue(1),
    save: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
  }
}

describe('AuthUseCase: testing all possible response', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should save token if not found on database', async () => {
    const userRepositoryMock: IUserRepository = createUserRepositoryMock('123')
    const userTokenRepositoryMock: IUserTokenRepository = {
      findRefreshToken: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      getByUserId: jest.fn().mockResolvedValue(undefined),
      update: jest.fn().mockRejectedValue(new Error('Funcion not implemented.')),
      save: jest.fn().mockResolvedValue(undefined)
    }

    const result = await new AuthUseCase(userRepositoryMock, userTokenRepositoryMock).execute('will@mail.com', '123')

    expect(result.code).toBe(UseCaseResponsesEnum.Success)
    expect(result.body).toBe('User logged in successfully!')
  })

  it('should make successfull login with email and password', async () => {
    const userRepositoryMock: IUserRepository = createUserRepositoryMock('123')
    const userTokenRepositoryMock: IUserTokenRepository = createUserTokenRepositoryMock(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTcwNzg2Mzk5MywiZXhwIjoxNzA4NDY4NzkzfQ.Sj-SD_pPEWQaGARUbQWi1c1EfuqFnqs3HGi8QD7mfNA'
    )

    const result = await new AuthUseCase(userRepositoryMock, userTokenRepositoryMock).execute('will@mail.com', '123')

    expect(result.code).toBe(UseCaseResponsesEnum.Success)
    expect(result.body).toBe('User logged in successfully!')
  })

  it('should fail login with email not found', async () => {
    const userRepositoryMock: IUserRepository = {
      getById: jest.fn().mockRejectedValue(new Error('Funcion not implemented.')),
      getByEmail: jest.fn().mockResolvedValue(undefined),
      save: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }
    const userTokenRepositoryMock: IUserTokenRepository = createUserTokenRepositoryMock(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTcwNzg2Mzk5MywiZXhwIjoxNzA4NDY4NzkzfQ.Sj-SD_pPEWQaGARUbQWi1c1EfuqFnqs3HGi8QD7mfNA'
    )

    const result = await new AuthUseCase(userRepositoryMock, userTokenRepositoryMock).execute('will@mail.com', '123')

    expect(result.code).toBe(UseCaseResponsesEnum.UserNotFound)
    expect(result.body).toBe('User Not found on database.')
  })

  it('should fail login with incorrect password', async () => {
    const userRepositoryMock: IUserRepository = createUserRepositoryMock('123')
    const userTokenRepositoryMock: IUserTokenRepository = createUserTokenRepositoryMock(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTcwNzg2Mzk5MywiZXhwIjoxNzA4NDY4NzkzfQ.Sj-SD_pPEWQaGARUbQWi1c1EfuqFnqs3HGi8QD7mfNA'
    )

    const result = await new AuthUseCase(userRepositoryMock, userTokenRepositoryMock).execute('will@mail.com', '456')

    expect(result.code).toBe(UseCaseResponsesEnum.InvalidCredentials)
    expect(result.body).toBe('Wrong Email or Password!')
  })

  it('should return missing params if email is not provided', async () => {
    const userRepositoryMock: IUserRepository = {
      getById: jest.fn().mockRejectedValue(new Error('Funcion not implemented.')),
      getByEmail: jest.fn().mockRejectedValue(new Error('Funcion not implemented.')),
      save: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const userTokenRepositoryMock: IUserTokenRepository = {
      findRefreshToken: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      getByUserId: jest.fn().mockRejectedValue(new Error('Funcion not implemented.')),
      update: jest.fn().mockRejectedValue(new Error('Funcion not implemented.')),
      save: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const result = await new AuthUseCase(userRepositoryMock, userTokenRepositoryMock).execute('', '456')

    expect(result.code).toBe(UseCaseResponsesEnum.InvalidParameters)
    expect(result.body).toBe('Missing params: email or password!')
  })

  it('should return missing params if password is not provided', async () => {
    const userRepositoryMock: IUserRepository = {
      getById: jest.fn().mockRejectedValue(new Error('Funcion not implemented.')),
      getByEmail: jest.fn().mockRejectedValue(new Error('Funcion not implemented.')),
      save: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const userTokenRepositoryMock: IUserTokenRepository = {
      findRefreshToken: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      getByUserId: jest.fn().mockRejectedValue(new Error('Funcion not implemented.')),
      update: jest.fn().mockRejectedValue(new Error('Funcion not implemented.')),
      save: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const result = await new AuthUseCase(userRepositoryMock, userTokenRepositoryMock).execute('will@mail.com', '')

    expect(result.code).toBe(UseCaseResponsesEnum.InvalidParameters)
    expect(result.body).toBe('Missing params: email or password!')
  })
})
