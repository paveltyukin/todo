import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ schema: 'public', name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text' })
  surname: string

  @Column({ type: 'text' })
  patronymic: string

  @Column({ type: 'text', unique: true })
  email: string

  @Column({ type: 'text' })
  password: string

  @Column({ type: 'boolean', name: 'is_activated', default: false })
  isActivated: boolean
}
