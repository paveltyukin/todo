import { RootState } from '../index'

export const getFingerprint = (state: RootState) => state.auth.fingerprint
