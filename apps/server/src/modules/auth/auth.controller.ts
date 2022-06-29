import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { Request, Response } from 'express'
import { TokenService } from './token.service'
import { FingerprintGuard } from './guards/fingerprint.guard'
import { RefreshTokenGuard } from './guards/refresh-token.guard'
import { TokenRepository } from './token.repository'
import { UserRepository } from '../user/user.repository'

@Controller('auth')
@UseGuards(FingerprintGuard)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly tokenRepository: TokenRepository
  ) {}

  @Post('registration')
  async registration(@Body() body) {
    console.log('registration')
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const fingerprint = req.headers['x-fingerprint'] as string
    const refreshToken = await this.tokenRepository.add(
      req.user.id,
      fingerprint
    )
    const accessToken = await this.tokenService.generateAccessToken(req.user)

    res.json({ accessToken, refreshToken: refreshToken.refreshToken })
  }

  @Post('logout')
  async logout() {
    console.log('logout')
  }

  @UseGuards(RefreshTokenGuard)
  @Post('check-auth')
  async checkAuth(@Req() req: Request) {
    const fingerprint = req.headers['x-fingerprint'] as string
    const refreshTokenByRequest = req.headers['x-refresh-token'] as string
    const currentToken =
      await this.tokenService.findOneByRefreshTokenAndFingerprint(
        refreshTokenByRequest,
        fingerprint
      )

    const updatedToken = await this.tokenRepository.update(
      currentToken.userId,
      fingerprint
    )

    const user = await this.userRepository.findOneByIdForRequest(
      currentToken.userId
    )

    return {
      accessToken: this.tokenService.generateAccessToken(user),
      refreshToken: updatedToken.refreshToken,
    }
  }
}

// key1 - microservice 1
// key = key1_blavla = 1
// key = '{key1:{key:'value'}}'
