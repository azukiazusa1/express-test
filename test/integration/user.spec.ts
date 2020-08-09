import request from 'supertest'
import mongoose from 'mongoose'
import app from '../../src/index'
import User from '../../src/Models/user'
import { User as UserType } from '../../src/types/user'

// テストデータ
const users: UserType[] = [
  {
    username: 'user1',
    firstName: 'aaa',
    lastName: 'bbb',
    gender: 'male',
    age: 22
  },
  {
    username: 'user2',
    firstName: 'ccc',
    lastName: 'ddd',
    gender: 'male',
    age: 30
  },
  {
    username: 'user3',
    firstName: 'eee',
    lastName: 'fff',
    gender: 'female',
    age: 34
  }
]

describe('intergration user', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.collection.insertMany(users)
  })

  afterAll(() => {
    mongoose.connection.close()
  })

  describe('GET /api/users/:username', () => {
    test('responds with json', async () => {
      const response = await request(app)
        .get('/api/users/user1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.user.username).toEqual(users[0].username)
    })
  })

  describe('POST /api/users', () => {
    test('responds with json', async () => {
      const user: UserType = {
        username: 'user4',
        firstName: 'ggg',
        lastName: 'hhh',
        gender: 'female',
        age: 48
      }
      const response = await request(app)
        .post('/api/users')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)

      expect(response.body.user._id).toBeDefined()
    })
  })
})
