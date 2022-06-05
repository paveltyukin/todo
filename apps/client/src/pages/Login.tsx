import { useForm } from 'react-hook-form'
import { LoginData } from '../types'
import { useLoginMutation } from '../store/auth/authAPI'

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>()

  const [login] = useLoginMutation()

  const onSubmit = async (data: LoginData) => {
    const response = await login(data).unwrap()
    console.log(response)
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
