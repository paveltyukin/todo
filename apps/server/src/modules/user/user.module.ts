import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { userProviders } from './providers/user.providers'
import { DataBaseModule } from '../../core/database/database.module'
import { UserRepository } from './user.repository'

@Module({
  imports: [DataBaseModule],
  providers: [UserService, UserRepository, ...userProviders],
  exports: [UserService, UserRepository],
})
export class UserModule {}
