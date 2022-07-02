import { useForm } from 'react-hook-form'
import { LoginData } from '../types'
import { login } from '../store/auth/actions'

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>()

  const onSubmit = async (data: LoginData) => {
    await login(data)
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
