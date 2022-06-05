import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as morgan from 'morgan'
import { corsOptions } from './core/utils/corsOptions'
import { PrismaService } from './core/prisma/prisma.service'

const PORT = process.env.PORT
const HOST = process.env.HOST

async function start() {
  const app = await NestFactory.create(AppModule)

  app.enableCors(corsOptions)
  app.use(morgan(process.env.MORGAN_ENV))

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  app.setGlobalPrefix('api')

  await app.listen(PORT, HOST, () =>
    console.log(`Serve started on HOST=${HOST} PORT=${PORT}`)
  )
}

start().catch((err) => `Server error = ${err}`)
