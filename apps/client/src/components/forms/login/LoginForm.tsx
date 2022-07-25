import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { LoginData } from '../../../types'
import { useAppDispatch, useAppSelector } from '../../../store'
import { useNavigate } from 'react-router-dom'
import { getAuth, getAuthErrors, getIsLoading } from '../../../store/auth/selectors'
import { login } from '../../../store/auth/actions'

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>()
  const dispatch = useAppDispatch()
  const navigation = useNavigate()
  const isAuth = useAppSelector(getAuth)
  const isLoading = useAppSelector(getIsLoading)
  const serverErrors = useAppSelector(getAuthErrors)

  const onSubmit = async (data: LoginData) => {
    await dispatch(login(data))
  }

  useEffect(() => {
    if (isAuth) {
      navigation('/', { replace: true })
    }
  }, [isAuth, navigation])

  if (isLoading) {
    return <div>LOADING</div>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <input value="test@test.ru" {...register('email', { required: true })} />
      {errors.email && <span>Почта: обязательное поле</span>}
      {serverErrors.email &&
        serverErrors.email.map((serverError) => <span key={serverError}>{serverError}</span>)}

      <input value="1" {...register('password', { required: true })} />
      {errors.password && <span>Пароль: обязательное поле</span>}
      {serverErrors.password &&
        serverErrors.password.map((serverError) => <span key={serverError}>{serverError}</span>)}

      <input type="submit" />
    </form>
  )
}
