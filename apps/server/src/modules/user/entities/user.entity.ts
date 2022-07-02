import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { TokenEntity } from '../../auth/entities/token.entity'

@Entity({ schema: 'public', name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text' })
  surname: string

  @Column({ type: 'text' })
  patronymic: string

  @Column({ unique: true })
  email: string

  @Column({ type: 'text' })
  password: string

  @Column({ name: 'is_activated', default: false })
  isActivated: boolean

  @OneToMany(() => TokenEntity, (token) => token.user)
  tokens: TokenEntity[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
