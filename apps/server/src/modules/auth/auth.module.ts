import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../user/user.module'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { AuthController } from './auth.controller'
import { TokenService } from './token.service'
import { tokenProviders } from './providers/token.providers'
import { DataBaseModule } from '../../core/database/database.module'
import { ConfigModule } from '@nestjs/config'
import { EntityManager } from 'typeorm'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DataBaseModule,
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
    LocalStrategy,
    JwtStrategy,
    ...tokenProviders,
    EntityManager,
  ],
  exports: [AuthService],
})
export class AuthModule {}
