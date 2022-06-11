import { UserEntity } from '../../../modules/user/entities/user.entity'

declare global {
  namespace Express {
    interface User {
      id: UserEntity['id']
      email: UserEntity['email']
      isActivated: UserEntity['isActivated']
    }
  }
}
