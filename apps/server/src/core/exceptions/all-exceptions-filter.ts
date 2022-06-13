import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { customWriteLog } from '../utils/customWriteLog'
import { HttpAdapterHost } from '@nestjs/core'
import { Response } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost

    const ctx = host.switchToHttp()
    const url = httpAdapter.getRequestUrl(ctx.getRequest())
    const res = ctx.getResponse<Response>()

    let message
    if (exception instanceof HttpException && exception.message) {
      message = exception.message
    } else {
      message = 'Ошибка запроса, не заданы обязательные параметры.'
    }

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    customWriteLog(`${url}: ${message}`)

    return res.status(httpStatus).json({ message })
  }
}
