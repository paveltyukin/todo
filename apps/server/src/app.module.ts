import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { AuthMiddleware } from './modules/auth/middlewares/auth.middleware'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DATABASE_CONNECTION_NAME } from './core/constants'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: Number(configService.get('DATABASE_PORT')),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        name: DATABASE_CONNECTION_NAME,
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        logging:
          configService.get('TYPEORM_LOGGING') === 'debug'
            ? ['query', 'error']
            : ['error'],
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'bundles'),
    }),
    AuthModule,
    UserModule,
    JwtModule,
  ],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    })
  }
}
