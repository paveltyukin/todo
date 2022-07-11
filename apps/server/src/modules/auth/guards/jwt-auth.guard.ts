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
import { UserRepository } from '../../user/user.repository'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
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
        throw new HttpException({ message: 'token error' }, 401)
      }

      const existRefreshToken = await this.tokenService.findOneByRefreshTokenFingerprintUserId(
        refreshToken,
        fingerprint,
        isVerified.sub
      )

      if (!existRefreshToken) {
        throw new HttpException({ message: 'refresh token error' }, 401)
      }

      const accessToken = await this.tokenService.generateAccessToken(req.user)
      req.tokens = { accessToken, refreshToken }
    } catch (e) {
      const error = e as Error
      if (error.name === 'TokenExpiredError') {
        const decodedJwtAccessToken = this.jwtService.decode(authHeaderParts[1]) as JwtPayload

        const refreshToken = await this.tokenRepository.update(
          decodedJwtAccessToken.sub,
          fingerprint
        )

        req.user = await this.userRepository.findOneByIdForRequest(decodedJwtAccessToken.sub)
        const accessToken = await this.tokenService.generateAccessToken(req.user)

        req.tokens = {
          accessToken,
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
