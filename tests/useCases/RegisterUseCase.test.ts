import { IUserRepository } from '../../src/domains/repositories'
import { IEmailValidator } from '../../src/domains/validators/IEmailValidator'
import { UseCaseResponsesEnum } from '../../src/enums/UseCaseResponsesEnum'
import { RegisterUseCase } from '../../src/useCases'
import bcrypt from 'bcrypt'
import { EmailValidator } from '../../src/validators/EmailValidator'

describe('RegisterUseCase: testing all possible responses', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should save a new user when given valid name, email, and password', async () => {
    const userRepository: IUserRepository = {
      save: jest.fn().mockResolvedValue({ id: 1, name: 'Will', email: 'will@mail.com' }),
      getById: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      getByEmail: jest.fn().mockResolvedValue(undefined)
    }

    const emailValidator: IEmailValidator = {
      isValid: jest.fn().mockResolvedValue(true)
    }

    const registerUseCase = new RegisterUseCase(userRepository, emailValidator)

    const result = await registerUseCase.execute('Will', 'will@mail.com', '123')

    expect(result.code).toBe(UseCaseResponsesEnum.Success)
    expect(result.body).toEqual({ id: 1, name: 'Will', email: 'will@mail.com' })
    expect(userRepository.save).toHaveBeenCalledWith('Will', 'will@mail.com', expect.any(String))
    expect(emailValidator.isValid).toHaveBeenCalledWith('will@mail.com')
  })

  it('should encrypt the password when saving the user', async () => {
    const userRepository: IUserRepository = {
      save: jest.fn().mockResolvedValue({ id: 1, name: 'Will', email: 'will@mail.com' }),
      getById: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      getByEmail: jest.fn().mockResolvedValue(undefined)
    }

    const emailValidator: IEmailValidator = {
      isValid: jest.fn().mockResolvedValue(true)
    }

    const registerUseCase = new RegisterUseCase(userRepository, emailValidator)

    await registerUseCase.execute('Will', 'will@mail.com', '123')

    expect(userRepository.save).toHaveBeenCalledWith('Will', 'will@mail.com', expect.any(String))
    const savedPassword = (userRepository.save as jest.Mock).mock.calls[0][2]
    expect(bcrypt.compareSync('123', savedPassword)).toBe(true)
  })

  it('should return invalid parameters if name is not provided', async () => {
    const registerUseCase = new RegisterUseCase({} as IUserRepository, {} as IEmailValidator)

    const result = await registerUseCase.execute('', 'will@mail.com', '123')

    expect(result.code).toBe(UseCaseResponsesEnum.InvalidParameters)
    expect(result.body).toBe('Missing params: name, email or password.')
  })

  it('should return invalid parameters if email is not provided', async () => {
    const registerUseCase = new RegisterUseCase({} as IUserRepository, {} as IEmailValidator)

    const result = await registerUseCase.execute('Will', '', '123')

    expect(result.code).toBe(UseCaseResponsesEnum.InvalidParameters)
    expect(result.body).toBe('Missing params: name, email or password.')
  })

  it('should return invalid parameters if password is not provided', async () => {
    const registerUseCase = new RegisterUseCase({} as IUserRepository, {} as IEmailValidator)

    const result = await registerUseCase.execute('Will', 'will@mail.com', '')

    expect(result.code).toBe(UseCaseResponsesEnum.InvalidParameters)
    expect(result.body).toBe('Missing params: name, email or password.')
  })

  it('should return invalid email if email given is not an email', async () => {
    const registerUseCase = new RegisterUseCase({} as IUserRepository, new EmailValidator())

    const result = await registerUseCase.execute('Will', 'willmail.com', '1234')

    expect(result.code).toBe(UseCaseResponsesEnum.InvalidEmail)
    expect(result.body).toBe('Invalid Email!')
  })

  it('should return already registered if email given is on database', async () => {
    const userRepository: IUserRepository = {
      save: jest.fn().mockResolvedValue(new Error('Function not implemented.')),
      getById: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      getByEmail: jest.fn().mockResolvedValue({ id: 1, name: 'Will', email: 'will@mail.com' })
    }

    const registerUseCase = new RegisterUseCase(userRepository, new EmailValidator())

    const result = await registerUseCase.execute('Will', 'will@mail.com', '1234')

    expect(result.code).toBe(UseCaseResponsesEnum.AlreadyRegistered)
    expect(result.body).toBe('Email already registered!')
  })
})
