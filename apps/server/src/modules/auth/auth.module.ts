import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../user/user.module'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { PrismaModule } from '../../core/prisma/prisma.module'
import { AuthController } from './auth.controller'
import { TokenService } from './token.service'

@Module({
  imports: [
    UserModule,
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
