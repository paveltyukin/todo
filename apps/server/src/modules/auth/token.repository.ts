import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { TokenEntity } from './entities/token.entity'
import { TOKENS_REPOSITORY } from '../../core/constants'
import { DataSource, Repository } from 'typeorm'

@Injectable()
export class TokenRepository {
  constructor(
    @Inject(TOKENS_REPOSITORY)
    private readonly tokenRepository: Repository<TokenEntity>,
    private dataSource: DataSource
  ) {}

  async delete(
    userId: number,
    fingerprint: string
  ): Promise<Partial<TokenEntity>> {
    let token: Partial<TokenEntity>

    try {
      await this.tokenRepository.delete({
        userId,
        fingerprint,
      })
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
      const existToken = await this.tokenRepository.findOne({
        where: { userId, fingerprint },
      })

      await this.dataSource.transaction(async () => {
        if (existToken) {
          await this.tokenRepository.delete({
            userId,
            fingerprint,
          })
        }

        token = await this.tokenRepository.save({
          userId,
          fingerprint,
          expiresIn: 1000 * 100 * 60 * 60,
        })
      })

      return token
    } catch (e) {
      const error = e as Error
      throw new BadRequestException({ message: 'error.name = ' + error.name })
    }
  }

  async update(
    userId: number,
    fingerprint: string
  ): Promise<Partial<TokenEntity>> {
    try {
      const exists = this.tokenRepository.findOne({
        where: {
          userId,
          fingerprint,
        },
      })

      if (!exists) {
        new NotFoundException('не найден')
      }

      await this.tokenRepository.delete({
        userId,
        fingerprint,
      })

      return this.tokenRepository.save({
        userId,
        fingerprint,
        expiresIn: 1000 * 100 * 60 * 60,
      })
    } catch (e) {
      const error = e as Error
      throw new BadRequestException({ message: 'error.name = ' + error.name })
    }
  }

  async findOne(where: Partial<TokenEntity>): Promise<Partial<TokenEntity>> {
    let token: Partial<TokenEntity>

    try {
      token = await this.tokenRepository.findOne({ where })
    } catch (e) {
      const error = e as Error
      throw new BadRequestException({ message: 'error.name = ' + error.name })
    }

    return token
  }

  async findOneOrFail(
    where: Partial<TokenEntity>
  ): Promise<Partial<TokenEntity>> {
    let token: Partial<TokenEntity>

    try {
      token = await this.tokenRepository.findOne({ where })

      if (!token) {
        throw new HttpException({ message: 'Not found' }, 400)
      }
    } catch (e) {
      const error = e as Error
      throw new BadRequestException({ message: 'error.name = ' + error.name })
    }

    return token
  }
}
