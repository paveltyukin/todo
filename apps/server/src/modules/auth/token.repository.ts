import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Token } from './entities/token.entity'
import { TOKENS_REPOSITORY } from '../../core/constants'
import { Sequelize } from 'sequelize-typescript'
import { Attributes, FindOptions } from 'sequelize/types/model'
import { TokenType } from './providers/token.providers'
import { WhereOptions } from 'sequelize'

@Injectable()
export class TokenRepository {
  constructor(
    @Inject(TOKENS_REPOSITORY)
    private readonly tokenRepository: TokenType,
    private sequelize: Sequelize
  ) {}

  async delete(userId: number, fingerprint: string): Promise<Partial<Token>> {
    let token: Partial<Token>

    try {
      await this.tokenRepository.destroy({ where: { userId, fingerprint } })
    } catch (e) {
      const error = e as Error
      throw new BadRequestException({ message: 'error.name = ' + error.name })
    }

    return token
  }

  async add(userId: number, fingerprint: string): Promise<Partial<Token>> {
    let token: Partial<Token>
    try {
      const existToken = await this.tokenRepository.findOne({
        where: { userId, fingerprint },
      })

      await this.sequelize.transaction(async (t) => {
        if (existToken) {
          await this.tokenRepository.destroy({
            where: { userId, fingerprint },
            transaction: t,
          })
        }

        token = await this.tokenRepository.create(
          {
            userId,
            fingerprint,
            expiresIn: 1000 * 100 * 60 * 60,
          },
          { transaction: t }
        )
      })

      return token
    } catch (e) {
      const error = e as Error
      throw new BadRequestException({ message: 'error.name = ' + error.name })
    }
  }

  async update(userId: number, fingerprint: string): Promise<Partial<Token>> {
    let token: Partial<Token>

    try {
      await this.sequelize.transaction(async (t) => {
        const exists = this.tokenRepository.findOne({
          where: { userId, fingerprint },
        })

        if (!exists) {
          new NotFoundException('не найден')
        }

        await this.tokenRepository.destroy({
          where: { userId, fingerprint },
          transaction: t,
        })

        token = await this.tokenRepository.create(
          { userId, fingerprint, expiresIn: 1000 * 100 * 60 * 60 },
          { transaction: t }
        )
      })
    } catch (e) {
      const error = e as Error
      throw new BadRequestException({ message: 'error.name = ' + error.name })
    }

    return token
  }

  async findOneByRefreshTokenAndFingerprint(
    refreshToken: string,
    fingerprint: string
  ): Promise<Partial<Token>> {
    let token: Partial<Token>

    try {
      token = await this.tokenRepository.findOne({
        where: { refreshToken, fingerprint },
      })
    } catch (e) {
      const error = e as Error
      throw new BadRequestException({ message: 'error.name = ' + error.name })
    }

    return token
  }

  async findOneByRefreshTokenAndFingerprintOrFail(
    refreshToken: string,
    fingerprint: string
  ): Promise<Partial<Token>> {
    let token: Partial<Token>

    try {
      token = await this.tokenRepository.findOne({
        where: { refreshToken, fingerprint },
      })

      if (!token) {
        throw new HttpException({ message: 'Not found' }, 400)
      }
    } catch (e) {
      const error = e as Error
      throw new BadRequestException({ message: 'error.name = ' + error.name })
    }

    return token
  }

  async findOne(where: WhereOptions<Token>): Promise<Partial<Token>> {
    let token: Partial<Token>

    try {
      token = await this.tokenRepository.findOne({ where: { where } })
    } catch (e) {
      const error = e as Error
      throw new BadRequestException({ message: 'error.name = ' + error.name })
    }

    return token
  }
}
