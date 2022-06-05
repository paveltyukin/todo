import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../../core/prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async registration(data: any) {
    console.log(123)
  }

  async login(data: any) {
    return [343434]
  }

  async logout() {
    console.log(123)
  }
}
