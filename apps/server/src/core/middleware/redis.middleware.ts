import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import * as session from 'express-session'
import { REDIS } from '../redis/redis.constants'
import * as RedisConnect from 'connect-redis'
import { RedisClient } from 'redis'
import * as passport from 'passport'

@Injectable()
export class RedisMiddleware implements NestMiddleware {
  sessionMiddleware

  constructor(@Inject(REDIS) private readonly redis: RedisClient) {
    this.sessionMiddleware = session({
      store: new (RedisConnect(session))({
        client: this.redis,
        logErrors: true,
      }),
      saveUninitialized: true,
      secret: process.env.REDIS_SECRET,
      resave: false,
      cookie: {
        sameSite: true,
        httpOnly: false,
        maxAge: 60000000,
      },
    })
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.sessionMiddleware(req, res, next)
    passport.initialize() //(req, res, next)
    passport.session() //(req, res, next)

    next()
  }
}
