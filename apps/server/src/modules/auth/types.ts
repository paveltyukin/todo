import { PickType } from '@nestjs/swagger'
import { AuthRegistrationDto } from './dto/auth.registration.dto'

export interface JwtPayload {
  surname: string
  name: string
  patronymic: string
  email: string
  sub: number
}

export interface TokenResponse {
  token: string
}
