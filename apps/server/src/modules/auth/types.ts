export interface GeneralPayload {
  surname: string
  name: string
  patronymic: string
  email: string
}

export interface JwtPayload extends GeneralPayload {
  sub: number
}

export interface UserPayload extends GeneralPayload {
  id: number
}

export interface TokenResponse {
  token: string
  refreshToken?: string
}
