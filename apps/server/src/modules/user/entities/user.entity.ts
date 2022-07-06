import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { Token } from '../../auth/entities/token.entity'

@Table({
  schema: 'public',
  tableName: 'users',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
export class User extends Model {
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  id: number

  @Column({ type: DataType.TEXT })
  name: string

  @Column({ type: DataType.TEXT })
  surname: string

  @Column({ type: DataType.TEXT })
  patronymic: string

  @Column({ type: DataType.TEXT, unique: true })
  email: string

  @Column({ type: DataType.TEXT })
  password: string

  @Column({ type: DataType.BOOLEAN, field: 'is_activated', defaultValue: false })
  isActivated: boolean

  @HasMany(() => Token)
  tokens: Token[]
}
