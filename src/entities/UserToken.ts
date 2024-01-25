import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('user_token')
export class UserToken {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({ name: 'created_at', type: 'timestamp with time zone', default: 'NOW()' })
  createdAt: Date

  @Column({ name: 'updated_at', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date
  
  @Column({ name: 'refresh_token' })
  refreshToken: string
  
  @OneToOne(() => User, user => user.token)
  @JoinColumn({ name: 'user_id' })
  user: User
}