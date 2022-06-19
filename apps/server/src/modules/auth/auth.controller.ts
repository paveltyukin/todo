import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { Request, Response } from 'express'
import { TokenService } from './token.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { FingerprintGuard } from './guards/fingerprint.guard'
import { RefreshTokenGuard } from './guards/refresh-token.guard'
import { TokenRepository } from './token.repository'

@Controller('auth')
@UseGuards(FingerprintGuard)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly tokenRepository: TokenRepository
  ) {}

  @Post('registration')
  async registration(@Body() body) {
    // return this.authService.registration(body)
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
    // return this.authService.logout()
  }

  @UseGuards(RefreshTokenGuard)
  @UseGuards(JwtAuthGuard)
  @Post('check-auth')
  async checkAuth() {
    return {
      status: 'OK',
      message: '',
      data: null,
    }
  }

  @UseGuards(RefreshTokenGuard)
  @UseGuards(JwtAuthGuard)
  @Post('regenerate-refresh-token')
  async regenerateRefreshToken(@Req() req: Request) {
    const fingerprint = req.headers['x-fingerprint'] as string
    await this.tokenRepository.update(1, fingerprint)
  }
}
