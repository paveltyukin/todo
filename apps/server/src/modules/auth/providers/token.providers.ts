import { DATABASE_CONNECTION, TOKENS_REPOSITORY } from '../../../core/constants'
import { DataSource } from 'typeorm'
import { TokenEntity } from '../entities/token.entity'

export const tokenProviders = [
  {
    provide: TOKENS_REPOSITORY,
    useFactory: (connection: DataSource) =>
      connection.getRepository(TokenEntity),
    inject: [DATABASE_CONNECTION],
  },
]
