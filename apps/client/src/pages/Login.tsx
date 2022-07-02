import { useForm } from 'react-hook-form'
import { LoginData } from '../types'
import { login } from '../store/auth/actions'
import { useAppDispatch, useAppSelector } from '../store'
import { useNavigate } from 'react-router-dom'
import { getAuth } from '../store/auth/selectors'

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>()
  const dispatch = useAppDispatch()
  const navigation = useNavigate()
  const isAuth = useAppSelector(getAuth)

  const onSubmit = async (data: LoginData) => {
    await dispatch(login(data))
    if (isAuth) {
      navigation('/', { replace: true })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <input value="test@test.ru" {...register('email', { required: true })} />
      {errors.password && <span>Почта: обязательное поле</span>}

      <input value="1" {...register('password', { required: true })} />
      {errors.password && <span>Пароль: обязательное поле</span>}

      <input type="submit" />
    </form>
  )
}
