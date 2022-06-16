import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { TokenEntity } from './entities/token.entity'
import { TOKENS_REPOSITORY } from '../../core/constants'
import { Repository } from 'typeorm'

@Injectable()
export class TokenRepository {
  constructor(
    @Inject(TOKENS_REPOSITORY)
    private readonly tokenRepository: Repository<TokenEntity>
  ) {}

  async delete(
    userId: number,
    fingerprint: string
  ): Promise<Partial<TokenEntity>> {
    let token: Partial<TokenEntity>

    try {
      await this.tokenRepository.update(
        {
          userId,
          fingerprint,
        },
        { refreshToken: () => 'uuid_generate_v4()' }
      )
    } catch (e) {
      const error = e as Error
      throw new BadRequestException({ message: 'error.name = ' + error.name })
    }

    return token
  }

  async add(
    userId: number,
    fingerprint: string
  ): Promise<Partial<TokenEntity>> {
    let token: Partial<TokenEntity>

    try {
      await this.tokenRepository.update(
        {
          userId,
          fingerprint,
        },
        { refreshToken: () => 'uuid_generate_v4()' }
      )
    } catch (e) {
      const error = e as Error
      throw new BadRequestException({ message: 'error.name = ' + error.name })
    }

    return token
  }

  async update(
    userId: number,
    fingerprint: string
  ): Promise<Partial<TokenEntity>> {
    let token: Partial<TokenEntity>

    try {
      await this.tokenRepository.update(
        {
          userId,
          fingerprint,
        },
        { refreshToken: () => 'uuid_generate_v4()' }
      )
    } catch (e) {
      const error = e as Error
      throw new BadRequestException({ message: 'error.name = ' + error.name })
    }

    return token
  }
}
