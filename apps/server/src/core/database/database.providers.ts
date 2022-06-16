import { DataSource } from 'typeorm'
import { DATABASE_CONNECTION, DATABASE_CONNECTION_NAME } from '../constants'

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        name: DATABASE_CONNECTION_NAME,
        synchronize: true,
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        logging:
          process.env.TYPEORM_LOGGING === 'debug'
            ? ['query', 'error']
            : ['error'],
      })

      return dataSource.initialize()
    },
  },
]
