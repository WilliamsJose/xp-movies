import { HTTPStatusCode } from '../../src/enums'
import {
  createResponseBadRequest,
  createResponseConflict,
  createResponseCreated,
  createResponseForbbiden,
  createResponseInternalServerError,
  createResponseNoContent,
  createResponseNotFound,
  createResponseSuccess,
  createResponseUnauthorized
} from '../../src/helpers/apiResponse'

describe('apiResponse => createResponseSuccess', () => {
  it('should return a valid http response success with message string', () => {
    const result = createResponseSuccess('OK', undefined)
    expect(result).toEqual({ status: HTTPStatusCode.OK, headers: undefined, body: { message: 'OK' } })
  })

  it('should return a valid http response success with body', () => {
    const result = createResponseSuccess({ OK: 'OK' }, undefined)
    expect(result).toEqual({ status: HTTPStatusCode.OK, headers: undefined, body: { OK: 'OK' } })
  })

  it('should return a valid http response success with one header', () => {
    const headers = {
      'Content-Type': 'application/json'
    }
    const result = createResponseSuccess({}, headers)
    expect(result).toEqual({ status: HTTPStatusCode.OK, headers: headers, body: {} })
  })

  it('should return a valid http response success with more than one header', () => {
    const headers = {
      'Content-Type': 'application/json',
      token: 'qa123'
    }
    const result = createResponseSuccess({}, headers)
    expect(result).toEqual({ status: HTTPStatusCode.OK, headers: headers, body: {} })
  })
})

describe('apiResponse => createResponseUnauthorized', () => {
  it('should return http response Unauthorized with message string', () => {
    const result = createResponseUnauthorized('KO', undefined)
    expect(result).toEqual({ status: HTTPStatusCode.Unauthorized, headers: undefined, body: { message: 'KO' } })
  })

  it('should return http response Unauthorized with body', () => {
    const result = createResponseUnauthorized({ KO: 'KO' }, undefined)
    expect(result).toEqual({ status: HTTPStatusCode.Unauthorized, headers: undefined, body: { KO: 'KO' } })
  })

  it('should return http response Unauthorized with one header', () => {
    const headers = {
      'Content-Type': 'application/json'
    }
    const result = createResponseUnauthorized({}, headers)
    expect(result).toEqual({ status: HTTPStatusCode.Unauthorized, headers: headers, body: {} })
  })

  it('should return http response Unauthorized with more than one header', () => {
    const headers = {
      'Content-Type': 'application/json',
      token: 'qa123'
    }
    const result = createResponseUnauthorized({}, headers)
    expect(result).toEqual({ status: HTTPStatusCode.Unauthorized, headers: headers, body: {} })
  })
})

describe('apiResponse => createResponseBadRequest', () => {
  it('should return a valid http response bad request with message string', () => {
    const result = createResponseBadRequest('Bad Request', undefined)
    expect(result).toEqual({
      status: HTTPStatusCode.BadRequest,
      headers: undefined,
      body: { message: 'Bad Request' }
    })
  })

  it('should return a valid http response bad request with body', () => {
    const result = createResponseBadRequest({ message: 'Bad Request' }, undefined)
    expect(result).toEqual({
      status: HTTPStatusCode.BadRequest,
      headers: undefined,
      body: { message: 'Bad Request' }
    })
  })

  it('should return a valid http response bad request with one header', () => {
    const headers = { 'Content-Type': 'application/json' }
    const result = createResponseBadRequest({}, headers)
    expect(result).toEqual({
      status: HTTPStatusCode.BadRequest,
      headers: headers,
      body: {}
    })
  })

  it('should return a valid http response bad request with more than one header', () => {
    const headers = { 'Content-Type': 'application/json', token: 'qa123' }
    const result = createResponseBadRequest({}, headers)
    expect(result).toEqual({
      status: HTTPStatusCode.BadRequest,
      headers: headers,
      body: {}
    })
  })
})

describe('apiResponse => createResponseConflict', () => {
  it('should return a valid http response conflict with message string', () => {
    const result = createResponseConflict('Confict', undefined)
    expect(result).toEqual({
      status: HTTPStatusCode.Conflict,
      headers: undefined,
      body: { message: 'Confict' }
    })
  })

  it('should return a valid http response conflict with body', () => {
    const result = createResponseConflict({ message: 'Confict' }, undefined)
    expect(result).toEqual({
      status: HTTPStatusCode.Conflict,
      headers: undefined,
      body: { message: 'Confict' }
    })
  })

  it('should return a valid http response conflict with one header', () => {
    const headers = { 'Content-Type': 'application/json' }
    const result = createResponseConflict({}, headers)
    expect(result).toEqual({
      status: HTTPStatusCode.Conflict,
      headers: headers,
      body: {}
    })
  })

  it('should return a valid http response conflict with more than one header', () => {
    const headers = { 'Content-Type': 'application/json', token: 'qa123' }
    const result = createResponseConflict({}, headers)
    expect(result).toEqual({
      status: HTTPStatusCode.Conflict,
      headers: headers,
      body: {}
    })
  })
})

describe('apiResponse => createResponseCreated', () => {
  it('should return a valid http response Created with message string', () => {
    const result = createResponseCreated('Created', undefined)
    expect(result).toEqual({
      status: HTTPStatusCode.Created,
      headers: undefined,
      body: { message: 'Created' }
    })
  })

  it('should return a valid http response Created with body', () => {
    const result = createResponseCreated({ message: 'Created' }, undefined)
    expect(result).toEqual({
      status: HTTPStatusCode.Created,
      headers: undefined,
      body: { message: 'Created' }
    })
  })

  it('should return a valid http response Created with one header', () => {
    const headers = { 'Content-Type': 'application/json' }
    const result = createResponseCreated({}, headers)
    expect(result).toEqual({
      status: HTTPStatusCode.Created,
      headers: headers,
      body: {}
    })
  })

  it('should return a valid http response Created with more than one header', () => {
    const headers = { 'Content-Type': 'application/json', token: 'qa123' }
    const result = createResponseCreated({}, headers)
    expect(result).toEqual({
      status: HTTPStatusCode.Created,
      headers: headers,
      body: {}
    })
  })
})

describe('apiResponse => createResponseNoContent', () => {
  it('should return a valid http response NoContent with one header', () => {
    const headers = { 'Content-Type': 'application/json' }
    const result = createResponseNoContent(headers)
    expect(result).toEqual({
      status: HTTPStatusCode.NoContent,
      headers: headers
    })
  })

  it('should return a valid http response NoContent with more than one header', () => {
    const headers = { 'Content-Type': 'application/json', token: 'qa123' }
    const result = createResponseNoContent(headers)
    expect(result).toEqual({
      status: HTTPStatusCode.NoContent,
      headers: headers
    })
  })
})

describe('apiResponse => createResponseForbbiden', () => {
  it('should return a valid http response Forbidden with message string', () => {
    const result = createResponseForbbiden('Forbbiden', undefined)
    expect(result).toEqual({
      status: HTTPStatusCode.Forbbiden,
      headers: undefined,
      body: { message: 'Forbbiden' }
    })
  })

  it('should return a valid http response Forbidden with body', () => {
    const result = createResponseForbbiden({ message: 'Forbbiden' }, undefined)
    expect(result).toEqual({
      status: HTTPStatusCode.Forbbiden,
      headers: undefined,
      body: { message: 'Forbbiden' }
    })
  })

  it('should return a valid http response Forbidden with one header', () => {
    const headers = { 'Content-Type': 'application/json' }
    const result = createResponseForbbiden({}, headers)
    expect(result).toEqual({
      status: HTTPStatusCode.Forbbiden,
      headers: headers,
      body: {}
    })
  })

  it('should return a valid http response Forbidden with more than one header', () => {
    const headers = { 'Content-Type': 'application/json', token: 'qa123' }
    const result = createResponseForbbiden({}, headers)
    expect(result).toEqual({
      status: HTTPStatusCode.Forbbiden,
      headers: headers,
      body: {}
    })
  })
})

describe('apiResponse => createResponseInternalServerError', () => {
  it('should return a valid http response InternalServerError with message string', () => {
    const result = createResponseInternalServerError('InternalServerError', undefined)
    expect(result).toEqual({
      status: HTTPStatusCode.InternalServerError,
      headers: undefined,
      body: { message: 'InternalServerError' }
    })
  })

  it('should return a valid http response InternalServerError with body', () => {
    const result = createResponseInternalServerError({ message: 'InternalServerError' }, undefined)
    expect(result).toEqual({
      status: HTTPStatusCode.InternalServerError,
      headers: undefined,
      body: { message: 'InternalServerError' }
    })
  })

  it('should return a valid http response InternalServerError with one header', () => {
    const headers = { 'Content-Type': 'application/json' }
    const result = createResponseInternalServerError({}, headers)
    expect(result).toEqual({
      status: HTTPStatusCode.InternalServerError,
      headers: headers,
      body: {}
    })
  })

  it('should return a valid http response InternalServerError with more than one header', () => {
    const headers = { 'Content-Type': 'application/json', token: 'qa123' }
    const result = createResponseInternalServerError({}, headers)
    expect(result).toEqual({
      status: HTTPStatusCode.InternalServerError,
      headers: headers,
      body: {}
    })
  })
})

describe('apiResponse => createResponseNotFound', () => {
  it('should return a valid http response NotFound with message string', () => {
    const result = createResponseNotFound('NotFound', undefined)
    expect(result).toEqual({
      status: HTTPStatusCode.NotFound,
      headers: undefined,
      body: { message: 'NotFound' }
    })
  })

  it('should return a valid http response NotFound with body', () => {
    const result = createResponseNotFound({ message: 'NotFound' }, undefined)
    expect(result).toEqual({
      status: HTTPStatusCode.NotFound,
      headers: undefined,
      body: { message: 'NotFound' }
    })
  })

  it('should return a valid http response NotFound with one header', () => {
    const headers = { 'Content-Type': 'application/json' }
    const result = createResponseNotFound({}, headers)
    expect(result).toEqual({
      status: HTTPStatusCode.NotFound,
      headers: headers,
      body: {}
    })
  })

  it('should return a valid http response NotFound with more than one header', () => {
    const headers = { 'Content-Type': 'application/json', token: 'qa123' }
    const result = createResponseNotFound({}, headers)
    expect(result).toEqual({
      status: HTTPStatusCode.NotFound,
      headers: headers,
      body: {}
    })
  })
})
