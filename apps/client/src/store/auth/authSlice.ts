import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

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

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('/fakeApi/users')
  return response.data
})

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
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      console.log(234234234234234, action)
      return action.payload
    })
  },
})

export const { setFingerprint, setAccessToken, setAuth } = authSlice.actions

export default authSlice.reducer
