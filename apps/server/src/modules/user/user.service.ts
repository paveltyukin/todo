import { BadRequestException, Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from '../../core/prisma/prisma.service'
import * as bcrypt from 'bcryptjs'
import { AuthLoginDto } from '../auth/dto/auth.login.dto'
import { LocalAuthGuard } from '../auth/guards/local-auth.guard'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(loginData: AuthLoginDto): Promise<Partial<User>> {
    let user: Partial<User>

    try {
      user = await this.prisma.user.findUnique({
        where: { email: loginData.email },
      })
    } catch (e) {
      throw new BadRequestException()
    }

    if (!user) {
      throw new BadRequestException()
    }

    const passwordEquals = await bcrypt.compare(
      loginData.password,
      user.password
    )

    if (!passwordEquals) {
      throw new BadRequestException()
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user

    return result
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({ where: { email } })
  }
}
