import { HTTPStatusCode } from '../enums'

export const createResponseBadRequest = (body: any, headers?: any) => {
  body = typeof body === 'string' ? { message: body } : body
  return {
    status: HTTPStatusCode.BadRequest,
    headers,
    body
  }
}

export const createResponseConflict = (body: any, headers?: any) => {
  body = typeof body === 'string' ? { message: body } : body
  return {
    status: HTTPStatusCode.Conflict,
    headers,
    body
  }
}

export const createResponseCreated = (body: any, headers?: any) => {
  body = typeof body === 'string' ? { message: body } : body
  return {
    status: HTTPStatusCode.Created,
    headers,
    body
  }
}

export const createResponseNoContent = (headers?: any) => {
  return {
    status: HTTPStatusCode.NoContent,
    headers
  }
}

export const createResponseForbbiden = (body: any, headers?: any) => {
  body = typeof body === 'string' ? { message: body } : body
  return {
    status: HTTPStatusCode.Forbbiden,
    headers,
    body
  }
}

export const createResponseInternalServerError = (body: any, headers?: any) => {
  body = typeof body === 'string' ? { message: body } : body
  return {
    status: HTTPStatusCode.InternalServerError,
    headers,
    body
  }
}

export const createResponseNotFound = (body: any, headers?: any) => {
  body = typeof body === 'string' ? { message: body } : body
  return {
    status: HTTPStatusCode.NotFound,
    headers,
    body
  }
}

export const createResponseUnauthorized = (body: any, headers?: any) => {
  body = typeof body === 'string' ? { message: body } : body
  return {
    status: HTTPStatusCode.Unauthorized,
    headers,
    body
  }
}

export const createResponseSuccess = (body: any, headers?: any) => {
  body = typeof body === 'string' ? { message: body } : body
  return {
    status: HTTPStatusCode.OK,
    headers,
    body
  }
}
