import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const PORT = process.env.PORT
const HOST = process.env.HOST

async function start() {
  const app = await NestFactory.create(AppModule)
  await app.listen(PORT, HOST, () =>
    console.log(`Serve started on HOST=${HOST} PORT=${PORT}`)
  )
}

start().catch((err) => `Server error = ${err}`)
