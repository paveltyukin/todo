import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'
import { TokenService } from '../token.service'
import { JwtPayload } from '../types'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest()
    const fingerprint = req.headers['x-fingerprint'] as string
    if (!req.headers.authorization) {
      throw new UnauthorizedException({ message: 'нет sтокена' })
    }

    const authHeader = req.headers.authorization
    const authHeaderParts = authHeader.split(' ')
    if (authHeaderParts.length !== 2) {
      throw new UnauthorizedException({ message: 'нет токена' })
    }

    if (authHeaderParts[0] !== 'Bearer' || !authHeaderParts[1]) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      })
    }

    try {
      const isVerified = await this.jwtService.verifyAsync(authHeaderParts[1])
    } catch (e) {
      const error = e as Error
      if (error.name === 'TokenExpiredError') {
        const decodedJwtAccessToken = this.jwtService.decode(
          authHeaderParts[1]
        ) as JwtPayload

        await this.tokenService.regenerateRefreshToken(
          fingerprint,
          decodedJwtAccessToken.sub
        )
      }
    }

    return true
  }

  private isValidRefreshToken(refresh_token: string): boolean {
    return !!refresh_token
  }
}
