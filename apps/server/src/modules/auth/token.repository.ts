import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Token } from './entities/token.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'

@Injectable()
export class TokenRepository {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly dataSource: DataSource
  ) {}

  async delete(userId: number, fingerprint: string): Promise<Partial<Token>> {
    let token: Partial<Token>

    try {
      await this.tokenRepository.delete({ userId, fingerprint })
    } catch (e) {
      const error = e as Error
      throw new BadRequestException({ message: 'error.name = ' + error.name })
    }

    return token
  }

  async add(userId: number, fingerprint: string): Promise<Partial<Token>> {
    let token: Partial<Token>

    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const existToken = await queryRunner.manager.findOne(Token, {
        where: { userId, fingerprint },
      })

      if (existToken) {
        await queryRunner.manager.delete(Token, { userId, fingerprint })
      }

      token = await queryRunner.manager.save(Token, {
        userId,
        fingerprint,
        expiresIn: 1000 * 100 * 60 * 60,
      })

      await queryRunner.manager.update(
        Token,
        { userId, fingerprint },
        {
          userId,
          fingerprint,
          expiresIn: 1000,
        }
      )

      await queryRunner.commitTransaction()
    } catch (e) {
      await queryRunner.rollbackTransaction()
      const error = e as Error
      throw new BadRequestException({ message: 'error.name = ' + error.name })
    } finally {
      await queryRunner.release()
    }

    return token
  }

  async update(userId: number, fingerprint: string): Promise<Partial<Token>> {
    let token: Partial<Token>

    try {
      const exists = this.tokenRepository.findOne({
        where: { userId, fingerprint },
      })

      if (!exists) {
        new NotFoundException('не найден')
      }

      await this.tokenRepository.delete({ userId, fingerprint })

      token = await this.tokenRepository.save({
        userId,
        fingerprint,
        expiresIn: 1000 * 100 * 60 * 60,
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

  async findOne(where: Partial<Token>): Promise<Partial<Token>> {
    let token: Partial<Token>

    try {
      token = await this.tokenRepository.findOne({ where })
    } catch (e) {
      const error = e as Error
      throw new BadRequestException({ message: 'error.name = ' + error.name })
    }

    return token
  }
}
