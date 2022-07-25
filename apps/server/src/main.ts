import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { corsOptions } from './core/utils/corsOptions'
import { Logger, NestApplicationOptions } from '@nestjs/common'
import * as morgan from 'morgan'
import { ValidationPipe } from './core/pipes/validation.pipe'
import { AllExceptionsFilter } from './core/exceptions/all-exceptions-filter'
import { loggerMiddleware } from './core/middlewares/logger.middleware'

const PORT = process.env.PORT
const HOST = process.env.HOST

async function start() {
  const options: NestApplicationOptions = { logger: ['log', 'error', 'warn', 'debug', 'verbose'] }
  const app = await NestFactory.create<NestExpressApplication>(AppModule, options)

  app.use(loggerMiddleware)
  app.use(morgan(process.env.MORGAN_ENV))
  app.enableCors(corsOptions)

  const logger = app.get(Logger)

  app.setGlobalPrefix('api')

  app.useGlobalPipes(new ValidationPipe())
  const adapterHost = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(adapterHost))

  await app.listen(PORT, HOST)
  logger.log(`🚀 Server start on host = ${HOST}, port = ${PORT}, url: ${await app.getUrl()}`)
}

start().catch((err) => console.log(`Server error: ${err}`))
