import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { $api } from '../../api'
import { CheckAuthResponse } from '../../types'

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

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const result = await $api('/auth/check-auth')
      const res = (await result.json()) as CheckAuthResponse

      if (!result.ok) {
        setAuth(false)
        setAccessToken('')
      } else {
        setAuth(res.isAuth)
        setAccessToken(res.accessToken)
      }

      return res
    } catch (err) {
      return rejectWithValue('Error!!')
    }
  }
)

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
    builder.addCase(checkAuth.fulfilled, (state, { payload }) => {
      setAuth(payload!.isAuth)
      setAccessToken(payload!.accessToken)
      localStorage.setItem('refreshToken', payload!.refreshToken)
    })
    builder.addCase(checkAuth.rejected, (state, { payload }) => {
      console.log(payload)
    })
  },
})

export const { setFingerprint, setAccessToken, setAuth } = authSlice.actions

export default authSlice.reducer
