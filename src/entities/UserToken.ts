import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './'
import { IUserToken } from '../domains/entities'

@Entity('user_token')
export class UserToken implements IUserToken {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column({ name: 'refresh_token' })
  refreshToken: string

  @OneToOne(() => User, (user) => user.token)
  @JoinColumn({ name: 'user_id', foreignKeyConstraintName: 'fk_usertoken_user' })
  user: User
}
