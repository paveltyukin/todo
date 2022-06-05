import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../../core/prisma/prisma.service'
import { Token, User } from '@prisma/client'
import { Request } from 'express'
import { REQUEST } from '@nestjs/core'

@Injectable({ scope: Scope.REQUEST })
export class TokenService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    @Inject(REQUEST) private request: Request
  ) {}

  async generate(user: Partial<User>) {
    const payload = {
      surname: user.surname,
      name: user.name,
      patronymic: user.patronymic,
      sub: user.id,
    }

    return {
      token: this.jwtService.sign(payload),
    }
  }

  async validate(token) {
    try {
      const userData = this.jwtService.verify(token)
      return userData
    } catch (e) {
      return null
    }
  }

  async add(userId: number): Promise<Partial<Token>> {
    let token: Partial<Token>
    const sessionID = this.request.sessionID
    console.log(sessionID)
    try {
      token = await this.prisma.token.create({
        data: {
          userId,
          fingerprint: sessionID,
          expiresIn: 1000 * 60 * 60,
        },
      })
    } catch (e) {
      throw new BadRequestException()
    }

    return token
  }

  async update(userId: number, refreshToken: string) {}

  async remove(refreshToken: string) {
    try {
      await this.prisma.token.delete({
        where: {
          refreshToken_fingerprint: {
            refreshToken: refreshToken,
            fingerprint: this.request.sessionID,
          },
        },
      })
    } catch (e) {
      throw new BadRequestException()
    }
  }

  async findOne(refreshToken: string): Promise<Token> {
    let tokens: Token[]
    try {
      tokens = await this.prisma.token.findMany({
        where: { refreshToken, fingerprint: this.request.sessionID },
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
