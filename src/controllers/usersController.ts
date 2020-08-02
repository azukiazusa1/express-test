import Express from 'express'
import User from '../Models/user'

export default {
  show: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    try {
      const username: string = req.params.username
      const user = await User.findOne().findByUserName(username)
      res.status(200).json({ user })
    } catch (e) {
      next(e)
    }
  },
  create: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    try {
      const user = await User.create(req.body)
      res.status(201).json({ user })
    } catch (e) {
      next(e)
    }
  }
}
