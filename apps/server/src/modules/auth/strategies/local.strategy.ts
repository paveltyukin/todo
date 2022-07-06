import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { UserService } from '../../user/user.service'
import { User } from '../../user/entities/user.entity'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<Partial<User>> {
    const user = await this.userService.validateUser({ email, password })
    if (!user) {
      throw new UnauthorizedException('not valid')
    }

    return user
  }
}
