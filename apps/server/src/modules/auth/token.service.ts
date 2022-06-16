import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserEntity } from '../user/entities/user.entity'
import { TokenEntity } from './entities/token.entity'
import {
  DATABASE_CONNECTION_NAME,
  TOKENS_REPOSITORY,
} from '../../core/constants'
import { EntityManager, Repository } from 'typeorm'
import { TokenResponse } from './types'
import { InjectEntityManager } from '@nestjs/typeorm'
import { TokenRepository } from './token.repository'

@Injectable()
export class TokenService {
  constructor(
    @InjectEntityManager(DATABASE_CONNECTION_NAME)
    private entityManager: EntityManager,
    @Inject(TOKENS_REPOSITORY)
    private readonly tokenEntityRepository: Repository<TokenEntity>,
    private readonly tokenRepository: TokenRepository,
    private readonly jwtService: JwtService
  ) {}

  async generate(user: Partial<UserEntity>): Promise<TokenResponse> {
    const payload = {
      surname: user.surname,
      name: user.name,
      patronymic: user.patronymic,
      email: user.email,
      sub: user.id,
    }

    const token = await this.jwtService.signAsync(payload)
    return { token }
  }

  async findOneByRefreshTokenAndFingerprint(
    refreshToken: string,
    fingerprint: string
  ): Promise<Partial<TokenEntity>> {
    return this.tokenEntityRepository.findOne({
      where: { refreshToken, fingerprint },
    })
  }
}
