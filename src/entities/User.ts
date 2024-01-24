import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserFavorite } from "./UserFavorite";
import { UserToken } from "./UserToken";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({ type: 'timestamp with time zone', default: 'now()' })
  date_modified: Date
  
  @Column({ type: 'text' })
  name: string
  
  @Column({ type: 'text', unique: true })
  email: string
  
  @Column()
  password: string

  @OneToMany(() => UserFavorite, favorite => favorite.user)
  favorites: UserFavorite[]

  @OneToOne(() => UserToken, token => token.id)
  token: UserToken
}