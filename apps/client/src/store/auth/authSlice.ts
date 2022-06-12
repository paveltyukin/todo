import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  isAuth: boolean
  accessToken: string
  fingerprint: string
}

const initialState: AuthState = {
  isAuth: true,
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
    setFingerprint: (state, action: PayloadAction<string>) => {
      state.fingerprint = action.payload
    },
  },
  extraReducers: (builder) => {},
})

export const { setFingerprint } = authSlice.actions

export default authSlice.reducer
