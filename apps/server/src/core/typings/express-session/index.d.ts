import { UserEntity } from '../../../modules/user/entities/user.entity'
import { TokenResponse } from '../../../modules/auth/types'

declare global {
  namespace Express {
    interface User {
      id: UserEntity['id']
      email: UserEntity['email']
      isActivated: UserEntity['isActivated']
    }
    interface Request {
      tokens: TokenResponse
    }
  }
}
