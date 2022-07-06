import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from '../../user/entities/user.entity'

@Table({
  schema: 'public',
  tableName: 'tokens',
  indexes: [{ name: 'fingerprint_and_refresh_token_uniq2', fields: ['fingerprint', 'userId'] }],
})
export class Token extends Model {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  id: number

  @Column({ type: DataType.TEXT })
  fingerprint: string

  @Column({ type: DataType.TEXT })
  refreshToken: string

  @Column({ type: DataType.INTEGER })
  expiresIn: number

  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT })
  userId: number

  @BelongsTo(() => User)
  user: User
}
