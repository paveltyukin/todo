export interface LoginData {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
}

export interface RegisterData {
  email: string
  password: string
}

export interface User {
  id: string
  email: string
}
