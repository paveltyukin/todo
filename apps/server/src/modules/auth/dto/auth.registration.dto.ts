import { IsString } from 'class-validator'

export class AuthRegistrationDto {
  @IsString({ message: 'Должна быть строка' })
  guid: string

  @IsString({ message: 'Должна быть строка' })
  name: string

  @IsString({ message: 'Должна быть строка' })
  surname: string

  @IsString({ message: 'Должна быть строка' })
  patronymic: string

  @IsString({ message: 'Должна быть строка' })
  email: string

  @IsString({ message: 'Должна быть строка' })
  password: string
}
