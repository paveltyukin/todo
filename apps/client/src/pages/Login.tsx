import { useForm } from 'react-hook-form'
import { LoginData, LoginResponse } from '../types'
import { useLoginMutation } from '../store/auth/authAPI'
import { useAppDispatch } from '../store'
import {
  setAccessToken,
  setAuth,
  setRefreshToken,
} from '../store/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>()
  const dispatch = useAppDispatch()

  const [login] = useLoginMutation()
  const navigate = useNavigate()

  const onSubmit = async (data: LoginData) => {
    const response = (await login(data).unwrap()) as LoginResponse
    dispatch(setAuth(true))
    dispatch(setAccessToken(response.accessToken))
    dispatch(setRefreshToken(response.refreshToken))
    navigate({ pathname: '/' })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true })} />
      {errors.password && <span>Почта: обязательное поле</span>}

      <input {...register('password', { required: true })} />
      {errors.password && <span>Парольь: обязательное поле</span>}

      <input type="submit" />
    </form>
  )
}
