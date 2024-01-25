import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserMovie } from "./UserMovie";
import { UserToken } from "./UserToken";

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({ type: 'timestamp with time zone', default: 'now()' })
  created_at: Date

  @Column({ type: 'timestamp with time zone', default: 'now()', onUpdate: 'now()' })
  updated_at: Date
  
  @Column({ type: 'text' })
  name: string
  
  @Column({ type: 'text', unique: true })
  email: string
  
  @Column()
  password: string

  @OneToMany(() => UserMovie, movie => movie.user)
  movie: UserMovie[]

  @OneToOne(() => UserToken, token => token.user)
  token: UserToken
}