import { Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { DataBaseModule } from './core/database/database.module'

@Module({
  imports: [
    DataBaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
  ],
  providers: [Logger],
})
export class AppModule {}
