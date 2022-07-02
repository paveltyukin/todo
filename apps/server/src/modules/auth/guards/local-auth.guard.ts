import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { UserRepository } from '../../user/user.repository'
import { Request } from 'express'
import { AuthLoginDto } from '../dto/auth.login.dto'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private readonly userRepository: UserRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest()
    const body: AuthLoginDto = req.body
    const user = await this.userRepository.findOne({ email: body.email })

    if (!user) {
      throw new NotFoundException({
        errors: { email: ['Не найден пользователь'] },
      })
    }

    const passwordIsVerify = bcrypt.compare(body.password, user.password)

    if (!passwordIsVerify) {
      throw new NotFoundException({
        errors: { email: ['Не найден пользователь'] },
      })
    }

    req.user = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      patronymic: user.patronymic,
      email: user.email,
    }

    return true
  }
}
