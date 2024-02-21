import { makeDeleteUserFavoriteController } from '../../src/factories'
import { DeleteUserFavoriteController } from '../../src/controllers'

describe('makeDeleteUserFavoriteController', () => {
  it('should return an instance of DeleteUserFavoriteController', () => {
    const controller = makeDeleteUserFavoriteController()
    expect(controller).toBeInstanceOf(DeleteUserFavoriteController)
  })
})
