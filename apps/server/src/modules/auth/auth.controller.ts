import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { Request, Response } from 'express'
import { TokenService } from './token.service'
import { FingerprintGuard } from './guards/fingerprint.guard'
import { TokenRepository } from './token.repository'
import { UserRepository } from '../user/user.repository'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

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

  @UseGuards(JwtAuthGuard)
  @Post('check-auth')
  async checkAuth(@Req() req: Request) {
    const fingerprint = req.headers['x-fingerprint'] as string

    const updatedToken = await this.tokenRepository.update(
      req.user.id,
      fingerprint
    )

    return {
      accessToken: req.tokens.accessToken,
      refreshToken: updatedToken.refreshToken,
    }
  }
}

// key1 - microservice 1
// key = key1_blavla = 1
// key = '{key1:{key:'value'}}'
