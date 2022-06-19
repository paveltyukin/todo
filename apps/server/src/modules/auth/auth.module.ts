import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../user/user.module'
import { AuthService } from './auth.service'
import { LocalStrategy } from './strategies/local.strategy'
import { AuthController } from './auth.controller'
import { TokenService } from './token.service'
import { tokenProviders } from './providers/token.providers'
import { TokenRepository } from './token.repository'
import { ConfigModule } from '@nestjs/config'
import { UserRepository } from '../user/user.repository'
import { UserService } from '../user/user.service'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    TokenRepository,
    LocalStrategy,
    ...tokenProviders,
  ],
  exports: [AuthService],
})
export class AuthModule {}
