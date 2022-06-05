import {
  Inject,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { REDIS } from './redis/redis.constants'
import * as RedisStore from 'connect-redis'
import { RedisClient } from 'redis'
import * as passport from 'passport'
import * as session from 'express-session'
import { RedisModule } from './redis/redis.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RedisModule],
  controllers: [],
  providers: [Logger],
})
export class AppModule implements NestModule {
  constructor(@Inject(REDIS) private readonly redis: RedisClient) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
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
        }),
        passport.initialize(),
        passport.session()
      )
      .forRoutes('*')
  }
}
