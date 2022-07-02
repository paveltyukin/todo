import { createAsyncThunk, ThunkDispatch } from '@reduxjs/toolkit'
import { CheckAuthResponse, LoginData, LoginResponse } from '../../types'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { LocalStorageService } from '../../services/local-storage.service'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants'
import { setAuth, setFingerprint } from './authSlice'
import { CheckAuthThunkAPI, LoginResponseThunkAPI } from './types'
import { RootState } from '../index'
import { HeaderParams, OptionsParams } from '../../api'

const clearAuthParams = async (dispatch: ThunkDispatch<unknown, any, any>) => {
  dispatch(setAuth(false))
  LocalStorageService.delete(ACCESS_TOKEN)
  LocalStorageService.delete(REFRESH_TOKEN)
}

const getHeaders = (state: RootState): OptionsParams => {
  const headers: HeaderParams = {}

  const fingerprint = state.auth.fingerprint
  if (fingerprint) {
    headers['x-fingerprint'] = fingerprint
  }

  const accessToken = LocalStorageService.getWithExpiry(ACCESS_TOKEN) ?? ''
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }

  const refreshToken = LocalStorageService.getWithExpiry(REFRESH_TOKEN) ?? ''
  if (refreshToken) {
    headers['x-refresh-token'] = refreshToken
  }

  return headers
}

export const checkAuth = createAsyncThunk<CheckAuthResponse, void, CheckAuthThunkAPI>(
  'auth/checkAuth',
  async (_, { rejectWithValue, dispatch, getState, extra: { $api } }) => {
    try {
      const fp = await FingerprintJS.load()
      const result = await fp.get()

      dispatch(setFingerprint(result.visitorId))
      const headers = getHeaders(getState() as RootState)

      const rest = await $api('/auth/check-auth', {}, headers)
      const res = (await rest.json()) as CheckAuthResponse

      if (!rest.ok) {
        await clearAuthParams(dispatch)
      } else {
        dispatch(setAuth(true))
        LocalStorageService.setWithExpiry(ACCESS_TOKEN, res.accessToken)
        LocalStorageService.setWithExpiry(REFRESH_TOKEN, res.refreshToken)
      }

      return res
    } catch (err) {
      return rejectWithValue('Error!!')
    }
  }
)

export const login = createAsyncThunk<void, LoginData, LoginResponseThunkAPI>(
  'auth/login',
  async (loginData, { rejectWithValue, dispatch, getState, extra: { $api } }) => {
    try {
      const headers = getHeaders(getState() as RootState)
      const response = await $api(
        '/auth/login',
        { email: loginData.email, password: loginData.password },
        headers
      )
      const res = (await response.json()) as LoginResponse

      if (!response.ok) {
        await clearAuthParams(dispatch)
      } else {
        dispatch(setAuth(true))
        LocalStorageService.setWithExpiry(ACCESS_TOKEN, res.accessToken)
        LocalStorageService.setWithExpiry(REFRESH_TOKEN, res.refreshToken)
      }
    } catch (err) {
      return rejectWithValue('Error!!')
    }
  }
)
