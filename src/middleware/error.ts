import Express from 'express'

export default {
  notFound: (_req: Express.Request, res: Express.Response) => {
    res.status(404)
    res.json({ message: 'Not Found' })
  },
  errorHandler: (
    err: Error,
    _req: Express.Request,
    res: Express.Response,
    _next: Express.NextFunction
  ) => {
    res.status(500)
    res.json({ message: err.message })
  }
}
