import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { customWriteLog } from '../utils/customWriteLog'
import { HttpAdapterHost } from '@nestjs/core'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost

    const ctx = host.switchToHttp()
    const url = httpAdapter.getRequestUrl(ctx.getRequest())

    let message
    if (exception instanceof HttpException && exception.message) {
      message = exception.message
    } else {
      message = 'Ошибка запроса, не заданы обязательные параметры.'
    }

    customWriteLog(`${url}: ${message}`)

    return {
      message,
    }
  }
}
