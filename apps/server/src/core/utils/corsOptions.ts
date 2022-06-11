import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

export const corsOptions: CorsOptions = {
  origin: (origin: string, callback) => {
    const urls = JSON.parse(process.env.CORS_URLS)
    if (!origin || urls.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  preflightContinue: false,
}
