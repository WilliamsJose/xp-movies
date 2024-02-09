import { HTTPStatusCode } from '../enums'

export const createResponseBadRequest = (message: any, headers?: any) => {
  message = typeof message === 'string' ? { message } : message
  return {
    status: HTTPStatusCode.BadRequest,
    headers,
    body: message
  }
}

export const createResponseConflict = (message: any, headers?: any) => {
  message = typeof message === 'string' ? { message } : message
  return {
    status: HTTPStatusCode.Conflict,
    headers,
    body: message
  }
}

export const createResponseCreated = (message: any, headers?: any) => {
  message = typeof message === 'string' ? { message } : message
  return {
    status: HTTPStatusCode.Created,
    headers,
    body: message
  }
}

export const createResponseForbbiden = (message: any, headers?: any) => {
  message = typeof message === 'string' ? { message } : message
  return {
    status: HTTPStatusCode.Forbbiden,
    headers,
    body: message
  }
}

export const createResponseInternalServerError = (message: any, headers?: any) => {
  message = typeof message === 'string' ? { message } : message
  return {
    status: HTTPStatusCode.InternalServerError,
    headers,
    body: message
  }
}

export const createResponseNotFound = (message: any, headers?: any) => {
  message = typeof message === 'string' ? { message } : message
  return {
    status: HTTPStatusCode.NotFound,
    headers,
    body: message
  }
}

export const createResponseUnauthorized = (message: any, headers?: any) => {
  message = typeof message === 'string' ? { message } : message
  return {
    status: HTTPStatusCode.Unauthorized,
    headers,
    body: message
  }
}

export const createResponseSuccess = (message: any, headers?: any) => {
  message = typeof message === 'string' ? { message } : message
  return {
    status: HTTPStatusCode.OK,
    headers,
    body: message
  }
}
