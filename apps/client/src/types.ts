export interface LoginData {
  email: string
  password: string
}

export interface LoginResponse {
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

export interface FingerPrintRequest {
  fingerprint: string
}

export interface JSXElementTypes {
  children: JSX.Element
}

export interface CheckAuthResponse {
  isAuth: boolean
}
