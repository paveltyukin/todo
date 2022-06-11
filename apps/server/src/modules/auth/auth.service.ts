import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // async registration(data: any) {}

  // async login(data: any) {}

  // async logout() {}
}
