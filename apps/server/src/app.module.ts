import {
  Inject,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as RedisStore from 'connect-redis'
import { RedisClient } from 'redis'
import * as passport from 'passport'
import * as session from 'express-session'
import { REDIS } from './core/redis/redis.constants'
import { RedisModule } from './core/redis/redis.module'
import { PrismaModule } from './core/prisma/prisma.module'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule,
    PrismaModule,
    AuthModule,
    UserModule,
  ],
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
        // RedisMiddleware
      )
      .forRoutes('*')
  }
}
