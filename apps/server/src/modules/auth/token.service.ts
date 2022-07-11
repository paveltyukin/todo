import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TokenRepository } from './token.repository'
import { User } from '../user/entities/user.entity'
import { Token } from './entities/token.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenEntityRepository: Repository<Token>,
    private readonly tokenRepository: TokenRepository,
    private readonly jwtService: JwtService
  ) {}

  async generateAccessToken(user: Partial<User>): Promise<string> {
    const payload = {
      surname: user.surname,
      name: user.name,
      patronymic: user.patronymic,
      email: user.email,
      sub: user.id,
    }
    return this.jwtService.signAsync(payload)
  }

  async findOneByRefreshTokenAndFingerprint(
    refreshToken: string,
    fingerprint: string
  ): Promise<Partial<Token>> {
    return this.tokenRepository.findOneByRefreshTokenAndFingerprint(refreshToken, fingerprint)
  }

  async findOneByRefreshTokenFingerprintUserId(
    refreshToken: string,
    fingerprint: string,
    userId: number
  ): Promise<Partial<Token>> {
    return this.tokenRepository.findOne({
      refreshToken,
      fingerprint,
      userId,
    })
  }
}
