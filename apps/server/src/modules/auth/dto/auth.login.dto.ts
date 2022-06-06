import { IsString } from 'class-validator'
import { User } from '@prisma/client'

export class AuthLoginDto implements Pick<User, 'email' | 'password'> {
  @IsString({ message: 'Должна быть строка' })
  email: string

  @IsString({ message: 'Должна быть строка' })
  password: string
}
