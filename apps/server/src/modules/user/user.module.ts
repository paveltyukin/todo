import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { userProviders } from './providers/user.providers'
import { UserRepository } from './user.repository'

@Module({
  imports: [],
  providers: [UserService, UserRepository, ...userProviders],
  exports: [UserService, UserRepository],
})
export class UserModule {}
