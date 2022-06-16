import {
  DATABASE_CONNECTION,
  DATABASE_CONNECTION_NAME,
  TOKENS_REPOSITORY,
} from '../../../core/constants'
import { DataSource } from 'typeorm'
import { TokenEntity } from '../entities/token.entity'
import { getDataSourceToken } from '@nestjs/typeorm'

export const tokenProviders = [
  {
    provide: TOKENS_REPOSITORY,
    useFactory: (connection: DataSource) =>
      connection.getRepository(TokenEntity),
    inject: [DATABASE_CONNECTION],
  },
]
