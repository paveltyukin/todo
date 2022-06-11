import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { userProviders } from './providers/user.providers'
import { DataBaseModule } from '../../core/database/database.module'

@Module({
  imports: [DataBaseModule],
  providers: [UserService, ...userProviders],
  exports: [UserService],
})
export class UserModule {}
