import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { checkAuth } from './actions'

export interface AuthState {
  isAuth: boolean
  accessToken: string
  fingerprint: string
  errors: {
    email: string[]
    password: string[]
  }
}

const initialState: AuthState = {
  isAuth: false,
  accessToken: '',
  fingerprint: '',
  errors: {
    email: [],
    password: [],
  },
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
  extraReducers(builder) {
    builder.addCase(checkAuth.rejected, (state, { payload }) => {
      console.log(payload)
    })
  },
})

export const { setFingerprint, setAccessToken, setAuth } = authSlice.actions

export default authSlice.reducer
