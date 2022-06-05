import { Module } from '@nestjs/common'
import * as Redis from 'redis'
import { REDIS } from './redis.constants'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [],
  providers: [
    {
      provide: REDIS,
      useFactory: (configService: ConfigService) =>
        Redis.createClient({
          port: configService.get<number>('REDIS_PORT'),
          host: configService.get<string>('REDIS_HOST'),
        }),
      inject: [ConfigService],
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}
