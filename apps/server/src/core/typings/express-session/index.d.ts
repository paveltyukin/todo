import { TokenResponse, UserPayload } from '../../../modules/auth/types'

declare global {
  namespace Express {
    // eslint-disable-next-line
    interface User extends UserPayload {}

    interface Request {
      tokens: TokenResponse
    }
  }
}
