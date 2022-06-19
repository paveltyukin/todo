import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Response } from 'express'
import { UserRepository } from '../../user/user.repository'
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async use(req: Request, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null
      next()
      return
    }

    const authHeader = req.headers.authorization
    const authHeaderParts = authHeader.split(' ')
    if (authHeaderParts.length !== 2) {
      req.user = null
      next()
      return
    }

    if (authHeaderParts[0] !== 'Bearer' || !authHeaderParts[1]) {
      req.user = null
      next()
      return
    }

    try {
      const decode = await this.jwtService.verifyAsync(authHeaderParts[1])
      req.user = await this.userRepository.findOneByIdForRequest(decode.sub)
      next()
    } catch (err) {
      req.user = null
      next()
    }
  }
}
