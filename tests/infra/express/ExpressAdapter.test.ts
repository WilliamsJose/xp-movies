import { IController } from '../../../src/domains/controllers'
import { expressAdapter } from '../../../src/infra/express/'

describe('ExpressAdapter', () => {
  it('should call controller handle with valid request and return response', async () => {
    const controllerMock: IController = {
      handle: jest.fn().mockResolvedValue({ status: 200, body: { message: 'ok' }, headers: { token: 'qa123' } })
    }

    const adapterResponse = expressAdapter(controllerMock)
    const req = {}
    const res = {
      header: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await adapterResponse(req as any, res as any)

    expect(controllerMock.handle).toHaveBeenCalledWith({
      query: {},
      body: {},
      params: {},
      headers: {}
    })
    expect(res.header).toHaveBeenCalledWith({ token: 'qa123' })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: 'ok' })
  })

  it('should handle undefined request object', async () => {
    const controllerMock: IController = {
      handle: jest.fn().mockResolvedValue({ status: 200, body: { message: 'ok' }, headers: { token: 'qa123' } })
    }

    const adapterResponse = expressAdapter(controllerMock)
    const req = undefined
    const res = {
      header: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await adapterResponse(req as any, res as any)

    expect(controllerMock.handle).toHaveBeenCalledWith({
      query: {},
      body: {},
      params: {},
      headers: {}
    })
    expect(res.header).toHaveBeenCalledWith({ token: 'qa123' })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: 'ok' })
  })
})
