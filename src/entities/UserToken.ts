import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('user_tokens')
export class UserToken {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  refresh_token: string
  
  @OneToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user_id: User
}