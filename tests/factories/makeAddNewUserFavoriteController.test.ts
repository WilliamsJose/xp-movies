import { makeAddNewUserFavoriteController } from '../../src/factories'
import { AddNewUserFavoriteController } from '../../src/controllers'

describe('makeAddNewUserFavoriteController', () => {
  it('should return an instance of AddNewUserFavoriteController', () => {
    const controller = makeAddNewUserFavoriteController()
    expect(controller).toBeInstanceOf(AddNewUserFavoriteController)
  })
})
