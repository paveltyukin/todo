import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { AuthMiddleware } from './modules/auth/middlewares/auth.middleware'
import { JwtModule } from '@nestjs/jwt'
import { MailerModule } from '@nestjs-modules/mailer'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import { MailModule } from './modules/mail/mail.module'
import { Token } from './modules/auth/entities/token.entity'
import { User } from './modules/user/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Token, User],
      autoLoadEntities: true,
      synchronize: true,
      logger: 'advanced-console',
      logging: ['query', 'error'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'bundles'),
      serveStaticOptions: {
        setHeaders: (res: any) => {
          res.set('csrf-token', '123123123')
        },
      },
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
        options: { strict: true },
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
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
