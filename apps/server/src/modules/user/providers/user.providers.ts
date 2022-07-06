import { USERS_REPOSITORY } from '../../../core/constants'
import { User } from '../entities/user.entity'

export const userProviders = [
  {
    provide: USERS_REPOSITORY,
    useValue: User,
  },
]

export type UserType = typeof User
