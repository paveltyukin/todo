import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  isAuth: boolean
}

const initialState: AuthState = {
  isAuth: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
  },
})

export default authSlice.reducer
