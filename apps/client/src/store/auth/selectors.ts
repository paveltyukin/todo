import { RootState } from '../index'

export const getFingerprint = (state: RootState) => state.auth.fingerprint
export const getAuth = (state: RootState) => state.auth.isAuth
export const getIsLoading = (state: RootState) => state.auth.isLoading
export const getAuthErrors = (state: RootState) => state.auth.errors
