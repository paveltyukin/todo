import { BadRequestException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { User } from './entities/user.entity'
import { AuthPassportLoginDto } from '../auth/dto/auth-passport-login.dto'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async validateUser(loginData: AuthPassportLoginDto): Promise<Partial<User>> {
    let user: Partial<User>

    try {
      user = await this.userRepository.findOneByEmailOrFail(loginData.email)
    } catch (e) {
      throw new BadRequestException('wewewe')
    }

    if (!user) {
      throw new BadRequestException('fgtrttgrtgrg')
    }

    const passwordEquals = await bcrypt.compare(loginData.password, user.password)

    if (!passwordEquals) {
      throw new BadRequestException('Введите правильно логин, пароль')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user

    return result
  }

  async findOne(email: string): Promise<Partial<User>> {
    return this.userRepository.findOneByEmailOrFail(email)
  }

  async generatePassword(password: string) {
    const salt = await bcrypt.genSalt(Number(process.env.GEN_SALT))
    return bcrypt.hash(password, salt)
  }
}
