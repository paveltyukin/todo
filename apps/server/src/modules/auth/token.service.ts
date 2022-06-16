import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserEntity } from '../user/entities/user.entity'
import { TokenEntity } from './entities/token.entity'
import {
  DATABASE_CONNECTION_NAME,
  TOKENS_REPOSITORY,
} from '../../core/constants'
import { DataSource, EntityManager, Repository } from 'typeorm'
import { TokenResponse } from './types'
import { InjectEntityManager } from '@nestjs/typeorm'

@Injectable()
export class TokenService {
  constructor(
    @InjectEntityManager(DATABASE_CONNECTION_NAME)
    private entityManager: EntityManager,
    @Inject(TOKENS_REPOSITORY)
    private readonly tokenEntityRepository: Repository<TokenEntity>,
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

  async validate(token) {
    try {
      const userData = this.jwtService.verify(token)
      return userData
    } catch (e) {
      return null
    }
  }

  async add(
    userId: number,
    fingerprint: string
  ): Promise<Partial<TokenEntity>> {
    let token: Partial<TokenEntity>

    try {
      await this.tokenEntityRepository.delete({
        userId,
        fingerprint,
      })

      token = await this.tokenEntityRepository.save({
        userId,
        fingerprint,
        expiresIn: 1000 * 60 * 60,
      })
    } catch (e) {
      const error = e as Error
      throw new BadRequestException({ message: 'error.name = ' + error.name })
    }

    return token
  }

  async remove(refreshToken: string, fingerprint: string) {
    try {
      await this.tokenEntityRepository.delete({ refreshToken, fingerprint })
    } catch (e) {
      throw new BadRequestException()
    }
  }

  async findOne(
    refreshToken: string,
    fingerprint: string
  ): Promise<TokenEntity> {
    let tokens: TokenEntity[]
    try {
      tokens = await this.tokenEntityRepository.find({
        where: { refreshToken, fingerprint },
      })
    } catch (e) {
      throw new BadRequestException()
    }

    if (tokens.length !== 1) {
      throw new BadRequestException()
    }

    return tokens[0]
  }
}
