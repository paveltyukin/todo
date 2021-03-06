import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { UserEntity } from './entities/user.entity'
import { USERS_REPOSITORY } from '../../core/constants'
import { Repository } from 'typeorm'
import { AuthPassportLoginDto } from '../auth/dto/auth-passport-login.dto'

@Injectable()
export class UserService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly userEntityRepository: Repository<UserEntity>
  ) {}

  async validateUser(
    loginData: AuthPassportLoginDto
  ): Promise<Partial<UserEntity>> {
    let user: Partial<UserEntity>

    try {
      user = await this.userEntityRepository.findOneOrFail({
        where: { email: loginData.email },
      })
    } catch (e) {
      throw new BadRequestException('wewewe')
    }

    if (!user) {
      throw new BadRequestException('fgtrttgrtgrg')
    }

    const passwordEquals = await bcrypt.compare(
      loginData.password,
      user.password
    )

    if (!passwordEquals) {
      throw new BadRequestException('Введите правильно логин, пароль')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user

    return result
  }

  async findOne(email: string): Promise<UserEntity | undefined> {
    return this.userEntityRepository.findOneOrFail({ where: { email } })
  }

  async generatePassword(password: string) {
    const salt = await bcrypt.genSalt(Number(process.env.GEN_SALT))
    return bcrypt.hash(password, salt)
  }
}
