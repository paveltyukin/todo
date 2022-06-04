import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { LoginData, LoginResponse, RegisterData, User } from '../../types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/auth`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<User, RegisterData>({
      query: (data) => ({
        url: 'register',
        method: 'POST',
        body: data,
      }),
    }),
    loginUser: builder.mutation<LoginResponse, LoginData>({
      query: (data) => ({
        url: 'login',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: 'logout',
        credentials: 'include',
      }),
    }),
  }),
})
