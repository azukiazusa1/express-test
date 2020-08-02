import userRoutes from '../../src/routes/userRoutes'
import usersController from '../../src/controllers/usersController'

jest.mock('Express', () => ({
  Router: () => ({
    get: jest.fn(),
    post: jest.fn()
  })
}))
jest.mock('../../src/controllers/usersController')

describe('src/routes/userRoutes', () => {
  test('get /api/users/:usernameには、showアクションが呼ばれる', () => {
    expect(userRoutes.get).toHaveBeenCalledWith(
      '/:username',
      usersController.show
    )
  })

  test('post /api/usersにはcreateアクションが呼ばれる', () => {
    expect(userRoutes.post).toHaveBeenCalledWith('/', usersController.create)
  })
})
