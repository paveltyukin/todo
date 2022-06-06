import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { PrismaService } from '../../core/prisma/prisma.service'
import { AuthService } from './auth.service'
import { AuthLoginDto } from './dto/auth.login.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { Request } from 'express'
import { TokenService } from './token.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService
  ) {}

  @Post('registration')
  async registration(@Body() body) {
    return this.authService.registration(body)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Body() body: AuthLoginDto) {
    const token = await this.tokenService.generate(body)
    await this.tokenService.add(req.user.id)
    return token
  }

  @Post('logout')
  async logout() {
    return this.authService.logout()
  }
}
