import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { AuthMiddleware } from './modules/auth/middlewares/auth.middleware'
import { JwtModule } from '@nestjs/jwt'
import { DATABASE_CONNECTION_NAME } from './core/constants'
import { MailerModule } from '@nestjs-modules/mailer'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import { MailModule } from './modules/mail/mail.module'
import { SequelizeModule } from '@nestjs/sequelize'
import { Token } from './modules/auth/entities/token.entity'
import { User } from './modules/user/entities/user.entity'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: Number(configService.get('DATABASE_PORT')),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        name: DATABASE_CONNECTION_NAME,
        models: [Token, User],
        logging: console.log,
        sync: { force: true },
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'bundles'),
    }),
    MailModule,
    MailerModule.forRoot({
      transport: process.env.MAIL_TRANSPORT,
      defaults: {
        from: '"TEST TEST" <test@test.test>',
      },
      template: {
        dir: join(__dirname, '..', 'mail', 'templates'),
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
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
