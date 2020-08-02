import { mockReq, mockRes } from 'sinon-express-mock'
import { User } from '../../src/types/user'
import usersController from '../../src/controllers/usersController'

interface Request {
  body: User
}

let mockError = false

jest.mock('../../src/Models/user', () => ({
  create: jest.fn((user: User) => {
    if (mockError) {
      return Promise.reject('Mock Error!')
    }
    const _id = '12345'
    return Promise.resolve({ _id, ...user })
  })
}))

describe('src/cotrollers/userController', () => {
  describe('create', () => {
    const testUser: User = {
      username: 'username',
      gender: 'male',
      age: 22
    }
    const request: Request = {
      body: testUser
    }
    describe('正常系', () => {
      test('作成したユーザーを返す', async () => {
        const req = mockReq(request)
        const res = mockRes()
        const next = jest.fn()

        await usersController.create(req, res, next)
        expect(res.status.calledWith(201)).toBeTruthy()

        const { user } = res.json.getCall(0).args[0]
        expect(user.username).toEqual(testUser.username)
        expect(user.gender).toEqual(testUser.gender)
        expect(user.age).toEqual(testUser.age)
      })
    })
    describe('異常系', () => {
      test('エラーが発生したらnext()が呼ばれる', async () => {
        mockError = true

        const req = mockReq(request)
        const res = mockRes()
        const next = jest.fn()

        await usersController.create(req, res, next)

        expect(next).toBeCalledWith('Mock Error!')
      })
    })
  })
})
