import { HTTPStatusCode } from '../enums'

export const createResponseBadRequest = (message: string) => {
  return {
    status: HTTPStatusCode.BadRequest,
    body: {
      message
    }
  }
}

export const createResponseConflict = (message: string) => {
  return {
    status: HTTPStatusCode.Conflict,
    body: {
      message
    }
  }
}

export const createResponseCreated = (message: string) => {
  return {
    status: HTTPStatusCode.Created,
    body: {
      message
    }
  }
}

export const createResponseForbbiden = (message: string) => {
  return {
    status: HTTPStatusCode.Forbbiden,
    body: {
      message
    }
  }
}

export const createResponseInternalServerError = (message: any) => {
  return {
    status: HTTPStatusCode.InternalServerError,
    body: {
      message
    }
  }
}

export const createResponseNotFound = (message: string) => {
  return {
    status: HTTPStatusCode.NotFound,
    body: {
      message
    }
  }
}

export const createResponseUnauthorized = (message: string) => {
  return {
    status: HTTPStatusCode.Unauthorized,
    body: {
      message
    }
  }
}

export const createResponseSuccess = (message: any) => {
  return {
    status: HTTPStatusCode.OK,
    body: {
      message
    }
  }
}
