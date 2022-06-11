import { IsString } from 'class-validator'
import { AuthPassportLoginDto } from './auth-passport-login.dto'

export class AuthLoginDto extends AuthPassportLoginDto {
  @IsString({ message: 'Должна быть строка' })
  fingerprint: string
}
