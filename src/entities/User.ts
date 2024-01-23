import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserFavorite } from "./UserFavotire";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({ type: 'timestamp with time zone', default: 'now()' })
  date_modified: Date
  
  @Column({ type: 'text' })
  name: string
  
  @Column({ type: 'text' })
  email: string
  
  @Column()
  password: string

  @OneToMany(() => UserFavorite, favorite => favorite.user)
  favorites: UserFavorite[]
}