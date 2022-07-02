import { useForm } from 'react-hook-form'
import { LoginData, LoginResponse } from '../types'
import { useLoginMutation } from '../store/auth/authAPI'
import { useAppDispatch } from '../store'
import { setAccessToken, setAuth } from '../store/auth/authSlice'
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
    localStorage.setItem('refreshToken', response.refreshToken)
    localStorage.setItem('accessToken', response.accessToken)
    navigate({ pathname: '/' })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <input value="test@test.ru" {...register('email', { required: true })} />
      {errors.password && <span>Почта: обязательное поле</span>}

      <input value="123" {...register('password', { required: true })} />
      {errors.password && <span>Парольь: обязательное поле</span>}

      <input type="submit" />
    </form>
  )
}
