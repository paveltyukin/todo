import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ schema: 'public', name: 'tokens' })
@Index(['fingerprint', 'userId'], { unique: true })
export class Token {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  fingerprint: string

  @Column({ type: 'text', generated: 'uuid', name: 'refresh_token' })
  refreshToken: string

  @Column({ type: 'integer', name: 'expires_in' })
  expiresIn: number

  @Column({ type: 'bigint', name: 'user_id' })
  userId: number
}
