import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { UserMovie, UserToken } from './'
import { IUser } from '../domains/entities'

@Entity('user')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text', unique: true })
  email: string

  @Column()
  password: string

  @OneToMany(() => UserMovie, (movie) => movie.user)
  movie: UserMovie[]

  @OneToOne(() => UserToken, (token) => token.user)
  token: UserToken
}
