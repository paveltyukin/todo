import axios, { AxiosRequestConfig } from 'axios'
import { store } from '../store'

export const API_URL = process.env.REACT_APP_API_URL
const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  const accessToken = store.getState().auth.accessToken
  const fingerprint = store.getState().auth.fingerprint

  if (!config.headers) {
    config.headers = {}
  }

  config.headers.Authorization = `Bearer ${accessToken}`
  config.headers['x-fingerprint'] = fingerprint
  return config
})

$api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const response = await axios.post(
          `${API_URL}/auth/regenerate-refresh-token`,
          {
            withCredentials: true,
          }
        )
        localStorage.setItem('token', response.data.accessToken)
        return $api.request(originalRequest)
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН')
      }
    }
    throw error
  }
)

export default $api
