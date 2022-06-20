import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  isAuth: boolean
  accessToken: string
  fingerprint: string
}

const initialState: AuthState = {
  isAuth: false,
  accessToken: '',
  fingerprint: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuth = payload
    },
    setAccessToken: (state, { payload }: PayloadAction<string>) => {
      state.accessToken = payload
    },
    setFingerprint: (state, { payload }: PayloadAction<string>) => {
      state.fingerprint = payload
    },
  },
  extraReducers: (builder) => {},
})

export const { setFingerprint, setAccessToken, setAuth } = authSlice.actions

export default authSlice.reducer
