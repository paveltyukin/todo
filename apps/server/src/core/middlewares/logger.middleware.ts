import { Request, Response, NextFunction } from 'express'

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(`url = ${req.url}, originalUrl = ${req.originalUrl}, baseUrl = ${req.baseUrl}`)
  next()
}
