import { PickType } from '@nestjs/swagger'
import { AuthRegistrationDto } from './dto/auth.registration.dto'

export class JwtPayload extends PickType(AuthRegistrationDto, [
  'name',
  'surname',
  'patronymic',
]) {
  id: number
  name: string
  surname: string
  patronymic: string
}

export interface TokenResponse {
  token: string
}
