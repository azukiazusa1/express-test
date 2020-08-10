import mongoose, { Schema, Document, Model, DocumentQuery } from 'mongoose'
import { User } from '../types/user'

export interface UserDoc extends Document, User {
  fullName?: string
}

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female']
    },
    age: {
      type: Number,
      min: 0,
      max: 100
    }
  },
  {
    timestamps: true
  }
)

userSchema.virtual('fullName').get(function(this: UserDoc) {
  return `${this.firstName} ${this.lastName}`
})

const queryHelpers = {
  findByUserName(this: DocumentQuery<any, UserDoc>, username: string) {
    return this.findOne({ username })
  }
}
userSchema.query = queryHelpers

interface UserModel extends Model<UserDoc, typeof queryHelpers> {}

export default mongoose.model<UserDoc, UserModel>('User', userSchema)
