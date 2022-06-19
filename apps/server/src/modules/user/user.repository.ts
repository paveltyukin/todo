import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { UserEntity } from './entities/user.entity'
import { UserPayload } from '../auth/types'
import { USERS_REPOSITORY } from '../../core/constants'

@Injectable()
export class UserRepository {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly userEntityRepository: Repository<UserEntity>
  ) {}

  async findOne(where: Partial<UserEntity>): Promise<Partial<UserEntity>> {
    let user: Partial<UserEntity>

    try {
      user = await this.userEntityRepository.findOne({ where })
    } catch (e) {
      const error = e as Error
      throw new BadRequestException({ message: 'error.name = ' + error.name })
    }

    return user
  }

  async findOneByIdForRequest(id: number): Promise<UserPayload> {
    let user: Partial<UserEntity>

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
}
