import { BadRequestException, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { UserEntity } from './entities/user.entity'
import { UserPayload } from '../auth/types'

@Injectable()
export class UserRepository {
  constructor(private readonly userRepository: Repository<UserEntity>) {}

  async findOne(where: Partial<UserEntity>): Promise<Partial<UserEntity>> {
    let token: Partial<UserEntity>

    try {
      token = await this.userRepository.findOne({ where })
    } catch (e) {
      const error = e as Error
      throw new BadRequestException({ message: 'error.name = ' + error.name })
    }

    return token
  }

  async findOneById(id: number): Promise<UserPayload> {
    let user: Partial<UserEntity>

    try {
      user = await this.userRepository.findOne({ where: { id } })
      if (!user) {
        throw new BadRequestException('sdfsdfsdf')
      }
    } catch (e) {
      const error = e as Error
      throw new BadRequestException({ message: 'error.name = ' + error.name })
    }

    return {
      id: user.id,
      surname: user.surname,
      name: user.name,
      patronymic: user.patronymic,
      email: user.email,
    }
  }
}
