import { BadRequestException, Injectable } from '@nestjs/common'
import { User } from './entities/user.entity'
import { UserPayload } from '../auth/types'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>
  ) {}

  async findOne(where: Partial<User>): Promise<Partial<User>> {
    let user: Partial<User>

    try {
      user = await this.userEntityRepository.findOne({ where })
    } catch (e) {
      const error = e as Error
      throw new BadRequestException({ message: 'error.name = ' + error.name })
    }

    return user
  }

  async findOneByIdForRequest(id: number): Promise<UserPayload> {
    let user: Partial<User>

    try {
      user = await this.userEntityRepository.findOne({ where: { id } })
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

  async findOneByEmailOrFail(email: string): Promise<Partial<User>> {
    let user: Partial<User>

    try {
      user = await this.userEntityRepository.findOne({ where: { email } })
      if (!user) {
        throw new BadRequestException('user not found')
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
