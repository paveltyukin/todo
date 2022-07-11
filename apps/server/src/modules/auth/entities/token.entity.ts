import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ schema: 'public', name: 'tokens' })
@Index(['fingerprint', 'userId'], { unique: true })
export class Token {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  fingerprint: string

  @Column({ type: 'text' })
  refreshToken: string

  @Column({ type: 'integer' })
  expiresIn: number

  @Column({ type: 'bigint', name: 'user_id' })
  userId: number
}
