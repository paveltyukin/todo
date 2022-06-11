import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { databaseProviders } from './database.providers'

@Global()
@Module({
  providers: [...databaseProviders],
  imports: [ConfigModule],
  exports: [...databaseProviders],
})
export class DataBaseModule {}
