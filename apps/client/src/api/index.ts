export interface HeaderParams {
  [x: string]: string
}

export interface OptionsParams {
  headers?: HeaderParams
}

export const $api = async (
  url: string,
  data = {},
  options: OptionsParams = {}
): Promise<Response> => {
  const headers: HeaderParams = {
    'Content-Type': 'application/json;charset=utf-8',
    ...options.headers,
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
