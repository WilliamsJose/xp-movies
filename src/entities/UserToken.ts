import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('user_token')
export class UserToken {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({ type: 'timestamp with time zone', default: 'now()' })
  created_at: Date

  @Column({ type: 'timestamp with time zone', default: 'now()', onUpdate: 'now()' })
  updated_at: Date
  
  @Column()
  refresh_token: string
  
  @OneToOne(() => User, user => user.token)
  @JoinColumn({ name: 'user_id' })
  user: User
}