import { IControllerResponse } from '../../src/domains/controllers'
import { IUseCaseResult } from '../../src/domains/useCases/IUseCaseResult'
import { HTTPStatusCode } from '../../src/enums'
import { UseCaseResponsesEnum } from '../../src/enums/UseCaseResponsesEnum'
import { mapResponseToHTTP } from '../../src/utils/mapResponseToHTTP'

describe('mapResponseToHTTP', () => {
  it('should return successful http response for success', () => {
    const useCaseResult: IUseCaseResult = {
      code: UseCaseResponsesEnum.Success,
      headers: undefined,
      body: 'OK'
    }
    const mapResult = mapResponseToHTTP(useCaseResult)

    const expectedResult: IControllerResponse = {
      body: { message: 'OK' },
      headers: undefined,
      status: HTTPStatusCode.OK
    }
    expect(mapResult).toEqual(expectedResult)
  })

  it('should return successful http response with no content for db deleted', () => {
    const useCaseResult: IUseCaseResult = {
      code: UseCaseResponsesEnum.DBDeleted,
      headers: undefined,
      body: undefined
    }
    const mapResult = mapResponseToHTTP(useCaseResult)

    const expectedResult: IControllerResponse = {
      body: undefined,
      headers: undefined,
      status: HTTPStatusCode.NoContent
    }
    expect(mapResult).toEqual(expectedResult)
  })

  it('should return not found http response if user not found', () => {
    const useCaseResult: IUseCaseResult = {
      code: UseCaseResponsesEnum.UserNotFound,
      headers: undefined,
      body: { message: 'User not found' }
    }
    const mapResult = mapResponseToHTTP(useCaseResult)

    const expectedResult: IControllerResponse = {
      body: { message: 'User not found' },
      headers: undefined,
      status: HTTPStatusCode.NotFound
    }
    expect(mapResult).toEqual(expectedResult)
  })

  it('should return bad request http response if invalid parameters', () => {
    const useCaseResult: IUseCaseResult = {
      code: UseCaseResponsesEnum.InvalidParameters,
      headers: undefined,
      body: { message: 'Invalid parameters' }
    }
    const mapResult = mapResponseToHTTP(useCaseResult)

    const expectedResult: IControllerResponse = {
      body: { message: 'Invalid parameters' },
      headers: undefined,
      status: HTTPStatusCode.BadRequest
    }
    expect(mapResult).toEqual(expectedResult)
  })

  it('should return bad request http response if invalid categories', () => {
    const useCaseResult: IUseCaseResult = {
      code: UseCaseResponsesEnum.InvalidCategories,
      headers: undefined,
      body: { message: 'Invalid categories' }
    }
    const mapResult = mapResponseToHTTP(useCaseResult)

    const expectedResult: IControllerResponse = {
      body: { message: 'Invalid categories' },
      headers: undefined,
      status: HTTPStatusCode.BadRequest
    }
    expect(mapResult).toEqual(expectedResult)
  })

  it('should return unauthorized http response if invalid credentials', () => {
    const useCaseResult: IUseCaseResult = {
      code: UseCaseResponsesEnum.InvalidCredentials,
      headers: undefined,
      body: { message: 'Invalid credentials' }
    }
    const mapResult = mapResponseToHTTP(useCaseResult)

    const expectedResult: IControllerResponse = {
      body: { message: 'Invalid credentials' },
      headers: undefined,
      status: HTTPStatusCode.Unauthorized
    }
    expect(mapResult).toEqual(expectedResult)
  })

  it('should return forbidden http response if invalid user', () => {
    const useCaseResult: IUseCaseResult = {
      code: UseCaseResponsesEnum.InvalidUser,
      headers: undefined,
      body: { message: 'Invalid user' }
    }
    const mapResult = mapResponseToHTTP(useCaseResult)

    const expectedResult: IControllerResponse = {
      body: { message: 'Invalid user' },
      headers: undefined,
      status: HTTPStatusCode.Forbbiden
    }
    expect(mapResult).toEqual(expectedResult)
  })

  it('should return bad request http response if invalid email', () => {
    const useCaseResult: IUseCaseResult = {
      code: UseCaseResponsesEnum.AlreadyRegistered,
      headers: undefined,
      body: { message: 'Already registered.' }
    }
    const mapResult = mapResponseToHTTP(useCaseResult)

    const expectedResult: IControllerResponse = {
      body: { message: 'Already registered.' },
      headers: undefined,
      status: HTTPStatusCode.BadRequest
    }
    expect(mapResult).toEqual(expectedResult)
  })

  it('should return bad request http response if invalid email', () => {
    const useCaseResult: IUseCaseResult = {
      code: UseCaseResponsesEnum.InvalidEmail,
      headers: undefined,
      body: { message: 'Invalid Email.' }
    }
    const mapResult = mapResponseToHTTP(useCaseResult)

    const expectedResult: IControllerResponse = {
      body: { message: 'Invalid Email.' },
      headers: undefined,
      status: HTTPStatusCode.BadRequest
    }
    expect(mapResult).toEqual(expectedResult)
  })

  it('should return bad request http response if invalid token', () => {
    const useCaseResult: IUseCaseResult = {
      code: UseCaseResponsesEnum.InvalidToken,
      headers: undefined,
      body: { message: 'Invalid Token.' }
    }
    const mapResult = mapResponseToHTTP(useCaseResult)

    const expectedResult: IControllerResponse = {
      body: { message: 'Invalid Token.' },
      headers: undefined,
      status: HTTPStatusCode.BadRequest
    }
    expect(mapResult).toEqual(expectedResult)
  })
})
