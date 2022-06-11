import { DATABASE_CONNECTION, USERS_REPOSITORY } from '../../../core/constants'
import { DataSource } from 'typeorm'
import { UserEntity } from '../entities/user.entity'

export const userProviders = [
  {
    provide: USERS_REPOSITORY,
    useFactory: (connection: DataSource) =>
      connection.getRepository(UserEntity),
    inject: [DATABASE_CONNECTION],
  },
]
