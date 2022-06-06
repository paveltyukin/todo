import { User as UserFromPrisma } from '@prisma/client'

declare global {
  namespace Express {
    // eslint-disable-next-line
    interface User extends UserFromPrisma {}
  }
}
