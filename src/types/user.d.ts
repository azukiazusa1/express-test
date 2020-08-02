export type Gender = 'male' | 'female'
export interface User {
  username: string
  firstName?: string
  lastName?: string
  gender: Gender
  age: number
}
