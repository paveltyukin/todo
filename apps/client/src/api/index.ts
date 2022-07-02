import { store } from '../store'

interface HeaderParams {
  [x: string]: string
}

interface OptionsParams {
  headers?: HeaderParams
}

export const $api = async (
  url: string,
  data = {},
  options: OptionsParams = {}
) => {
  const headers: HeaderParams = {
    'Content-Type': 'application/json;charset=utf-8',
    ...options.headers,
  }

  const accessToken = localStorage.getItem('accessToken') ?? ''
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }

  const fingerprint = store.getState().auth.fingerprint
  if (fingerprint) {
    headers['x-fingerprint'] = fingerprint
  }

  const refreshToken = localStorage.getItem('refreshToken') ?? ''
  if (refreshToken) {
    headers['x-refresh-token'] = refreshToken
  }

  return fetch(`${process.env.REACT_APP_API_URL}${url}`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  })
}
