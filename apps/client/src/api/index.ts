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

  const accessToken = store.getState().auth.accessToken
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }

  const fingerprint = store.getState().auth.fingerprint
  if (fingerprint) {
    headers['x-fingerprint'] = fingerprint
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
