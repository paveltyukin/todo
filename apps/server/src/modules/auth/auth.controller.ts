import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { Request, Response } from 'express'
import { TokenService } from './token.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { FingerprintGuard } from './guards/fingerprint.guard'
import { RefreshTokenGuard } from './guards/refresh-token.guard'

@Controller('auth')
@UseGuards(FingerprintGuard)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService
  ) {}

  @Post('registration')
  async registration(@Body() body) {
    // return this.authService.registration(body)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const fingerprint = req.headers['x-fingerprint'] as string
    const refreshToken = await this.tokenService.add(req.user.id, fingerprint)
    const token = await this.tokenService.generate(req.user)

    res.json({ token: token.token, refreshToken: refreshToken.refreshToken })
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

  // @Post('regenerate-refresh-token')
  // async regenerateRefreshToken(@Req() req: Request) {
  //   const fingerprint = req.headers['x-fingerprint'] as string
  //   await this.tokenService.add(fingerprint, 1)
  // }
}
