import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserEntity } from '../user/entities/user.entity'
import { TokenEntity } from './entities/token.entity'
import { TOKENS_REPOSITORY } from '../../core/constants'
import { Repository } from 'typeorm'
import { TokenRepository } from './token.repository'

@Injectable()
export class TokenService {
  constructor(
    @Inject(TOKENS_REPOSITORY)
    private readonly tokenEntityRepository: Repository<TokenEntity>,
    private readonly tokenRepository: TokenRepository,
    private readonly jwtService: JwtService
  ) {}

  async generateAccessToken(user: Partial<UserEntity>): Promise<string> {
    const payload = {
      surname: user.surname,
      name: user.name,
      patronymic: user.patronymic,
      email: user.email,
      sub: user.id,
    }

    return await this.jwtService.signAsync(payload)
  }

  async findOneByRefreshTokenAndFingerprint(
    refreshToken: string,
    fingerprint: string
  ): Promise<Partial<TokenEntity>> {
    return this.tokenRepository.findOneOrFail({ refreshToken, fingerprint })
  }

  async findOneByRefreshTokenFingerprintUserId(
    refreshToken: string,
    fingerprint: string,
    userId: number
  ): Promise<Partial<TokenEntity>> {
    return this.tokenRepository.findOne({ refreshToken, fingerprint, userId })
  }
}
