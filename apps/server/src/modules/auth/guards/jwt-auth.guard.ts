import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'
import { TokenService } from '../token.service'
import { JwtPayload } from '../types'
import { TokenRepository } from '../token.repository'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private readonly tokenRepository: TokenRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest()
    const fingerprint = req.headers['x-fingerprint'] as string
    const refreshToken = req.headers['x-refresh-token'] as string
    if (!req.headers.authorization) {
      throw new UnauthorizedException({ message: 'нет токена' })
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
      if (!isVerified) {
        new HttpException({ message: 'token error' }, 401)
      }

      const existRefreshToken =
        await this.tokenService.findOneByRefreshTokenAndFingerprint(
          refreshToken,
          fingerprint
        )
      if (existRefreshToken) {
        new HttpException({ message: 'refresh token error' }, 401)
      }
    } catch (e) {
      const error = e as Error
      if (error.name === 'TokenExpiredError') {
        const decodedJwtAccessToken = this.jwtService.decode(
          authHeaderParts[1]
        ) as JwtPayload

        const refreshToken = await this.tokenRepository.update(
          decodedJwtAccessToken.sub,
          fingerprint
        )
        // к БД запрос на обновление
        const token = await this.tokenService.generate(req.user)

        req.tokens = {
          token: token.token,
          refreshToken: refreshToken.refreshToken,
        }
      } else {
        throw new UnauthorizedException({
          message: 'ошибка !',
        })
      }
    }

    return true
  }
}
