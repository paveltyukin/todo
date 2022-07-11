import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Token } from './entities/token.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class TokenRepository {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>
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
    try {
      const existToken = await this.tokenRepository.findOne({
        where: { userId, fingerprint },
      })

      if (existToken) {
        await this.tokenRepository.delete({ userId, fingerprint })
      }

      token = await this.tokenRepository.create({
        userId,
        fingerprint,
        expiresIn: 1000 * 100 * 60 * 60,
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
      const exists = this.tokenRepository.findOne({
        where: { userId, fingerprint },
      })

      if (!exists) {
        new NotFoundException('не найден')
      }

      await this.tokenRepository.delete({ userId, fingerprint })

      token = await this.tokenRepository.create({
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
