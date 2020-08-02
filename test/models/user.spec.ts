import mongoose from 'mongoose'
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

describe('src/models/user', () => {
  // データベースに接続
  beforeAll(async () => {
    mongoose.Promise = global.Promise
    await mongoose.connect((global as any).__MONGO_URI__, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
  })

  // テストデータをテスト毎に挿入
  beforeEach(async () => {
    await User.deleteMany({})
    await User.collection.insertMany(users)
  })

  // 接続を閉じる
  afterAll(() => {
    mongoose.connection.close()
  })

  describe('クエリヘルパー', () => {
    describe('findOrCreate', () => {
      test('指定したusernameのユーザーが取得できる', async () => {
        const result = await User.findOne().findByUserName('user1')
        expect(result?.username).toEqual('user1')
      })
    })
  })

  describe('バリデーション', () => {
    describe('username', () => {
      test('usernameはuniqueでなけれなばらない', async () => {
        const invalidUser: UserType = {
          username: 'user1',
          firstName: 'firstName',
          lastName: 'lastName',
          gender: 'female',
          age: 18
        }
        await expect(User.create(invalidUser)).rejects.toThrow()
      })

      test('usernameは必須項目でなけれなばらない', async () => {
        const invalidUser: UserType = {
          username: '',
          firstName: 'firstName',
          lastName: 'lastName',
          gender: 'female',
          age: 18
        }
        await expect(User.create(invalidUser)).rejects.toThrow()
      })
    })
  })

  describe('バーチャルフィールド', () => {
    describe('fullName', () => {
      test('firstNameとLastNameを足して返す', async () => {
        const result = await User.findOne().findByUserName('user1')
        expect(result!.fullName).toEqual('aaa bbb')
      })
    })
  })
})
