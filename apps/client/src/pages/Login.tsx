import { useForm } from 'react-hook-form'
import { LoginData } from '../types'

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>()

  const onSubmit = (data: LoginData) => console.log(data)

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
