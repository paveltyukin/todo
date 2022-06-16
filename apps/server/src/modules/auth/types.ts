export interface JwtPayload {
  surname: string
  name: string
  patronymic: string
  email: string
  sub: number
}

export interface TokenResponse {
  token: string
  refreshToken?: string
}
