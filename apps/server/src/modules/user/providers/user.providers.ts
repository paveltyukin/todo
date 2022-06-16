import {
  DATABASE_CONNECTION,
  DATABASE_CONNECTION_NAME,
  USERS_REPOSITORY,
} from '../../../core/constants'
import { DataSource } from 'typeorm'
import { UserEntity } from '../entities/user.entity'
import { getDataSourceToken } from '@nestjs/typeorm'

export const userProviders = [
  {
    provide: USERS_REPOSITORY,
    useFactory: (connection: DataSource) =>
      connection.getRepository(UserEntity),
    inject: [DATABASE_CONNECTION],
  },
]
