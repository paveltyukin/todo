import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm'
import { Logger } from '@nestjs/common'
import { Token } from './entities/token.entity'

@EventSubscriber()
export class TokenSubscribe implements EntitySubscriberInterface<Token> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this)
  }

  listenTo(): typeof Token {
    return Token
  }

  beforeInsert(event: InsertEvent<Token>) {
    console.log(`BEFORE ENTITY UPDATED: `, event.entity)
  }

  beforeUpdate(event: UpdateEvent<Token>) {
    console.log(`BEFORE ENTITY UPDATED: `, event.entity)
  }

  afterUpdate(event: UpdateEvent<Token>): Promise<Token> | void {
    const pinCodeUpdated = event.updatedColumns.find(
      (value) => value.propertyName,
      Token.prototype.refreshToken
    )

    if (pinCodeUpdated) {
      if (Number(event.databaseEntity.refreshToken) !== event.entity.refreshToken) {
        Logger.log(
          `Price changed from ${event.databaseEntity.refreshToken} to ${event.entity.pinCode}`,
          'Product Price Updated',
          false
        )
      }
    }
  }
}
