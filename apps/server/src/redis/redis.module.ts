import { Module } from '@nestjs/common'
import * as Redis from 'redis'
import { REDIS } from './redis.constants'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: REDIS,
      useValue: Redis.createClient({
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
      }),
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}
