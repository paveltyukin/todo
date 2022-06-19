import { Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { DataBaseModule } from './core/database/database.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DataBaseModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'bundles'),
    }),
    AuthModule,
    UserModule,
  ],
  providers: [Logger],
})
export class AppModule {}
