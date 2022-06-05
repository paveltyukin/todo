import { IsString } from 'class-validator'

export class AuthLoginDto {
  @IsString({ message: 'Должна быть строка' })
  email: string

  @IsString({ message: 'Должна быть строка' })
  password: string
}
