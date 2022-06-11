import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { UserEntity } from '../../user/entities/user.entity'

@Entity({ schema: 'calc', name: 'tokens' })
export class TokenEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  fingerprint: string

  @Column({ type: 'text', name: 'refresh_token' })
  refreshToken: string

  @Column({ name: 'expires_in' })
  expiresIn: number

  @Column({ name: 'user_id' })
  userId: number

  @ManyToOne(() => UserEntity, (user) => user.tokens, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: UserEntity

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}