import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { Request } from 'express'
import { TokenService } from './token.service'
import { AuthPassportLoginDto } from './dto/auth-passport-login.dto'

@Controller('auth')
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
  async login(@Req() req: Request, @Body() body: AuthPassportLoginDto) {
    const token = await this.tokenService.generate(body)
    await this.tokenService.add(req.user.id, req.body.fingerprint)
    return token
  }

  @Post('logout')
  async logout() {
    // return this.authService.logout()
  }
}
