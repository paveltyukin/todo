import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { checkAuth, login } from './actions'

export interface AuthState {
  isLoading: boolean
  isAuth: boolean
  accessToken: string
  fingerprint: string
  errors: {
    email: string[]
    password: string[]
  }
}

const initialState: AuthState = {
  isLoading: true,
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
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    },
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
    builder.addCase(checkAuth.pending, (state, { payload }) => {
      console.log(payload)
    })
    builder.addCase(checkAuth.rejected, (state, { payload }) => {
      console.log(payload)
    })
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isAuth = true
    })
    builder.addCase(login.pending, (state, { payload }) => {
      state.isAuth = true
    })
  },
})

export const { setFingerprint, setAccessToken, setAuth, setIsLoading } = authSlice.actions

export default authSlice.reducer
