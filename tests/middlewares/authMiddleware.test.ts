import { HTTPStatusCode } from '../../src/enums'
import { verifyToken } from '../../src/middlewares'
import jwt from 'jsonwebtoken'

describe('verifyToken', () => {
  it('should return decoded token when valid authorization header is provided', async () => {
    const req = {
      query: {
        userId: '123'
      },
      header: jest.fn().mockReturnValue('authorization')
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }
    const next = jest.fn()

    const verify = jest.spyOn(jwt, 'verify')
    verify.mockImplementation(() => ({ id: '456' }))

    await verifyToken(req as any, res as any, next)

    expect(req.query.userId).toBe('456')
    expect(next).toHaveBeenCalled()
    expect(verify).toHaveBeenCalledWith(expect.any(String), expect.any(String))
  })

  it('should catch any error and return Unauthorized', async () => {
    const req = {
      query: {
        userId: '123'
      },
      header: jest.fn().mockReturnValue('authorization')
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }
    const next = jest.fn()

    const verify = jest.spyOn(jwt, 'verify')
    verify.mockImplementation(() => {
      throw new Error('oops')
    })

    await verifyToken(req as any, res as any, next)

    expect(next).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(HTTPStatusCode.Unauthorized)
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' })
  })

  it('should return Unauthorized status and message when authorization header is missing', async () => {
    const req = {
      query: {
        userId: undefined
      },
      header: jest.fn().mockReturnValue(undefined)
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }
    const next = jest.fn()

    await verifyToken(req as any, res as any, next)

    expect(req.query.userId).toBeUndefined()
    expect(next).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(HTTPStatusCode.Unauthorized)
    expect(res.json).toHaveBeenCalledWith({ message: 'Access denied' })
  })
})
