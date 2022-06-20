export interface LoginData {
  email: string
  password: string
}

export interface LoginResponse {
  isAuth: boolean
  accessToken: string
  refreshToken: string
}

export interface RegisterData {
  email: string
  password: string
}

export interface User {
  id: string
  email: string
}

export interface JSXElementTypes {
  children: JSX.Element
}

export interface CheckAuthResponse extends LoginResponse {}
