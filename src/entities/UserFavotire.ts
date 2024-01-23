import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('user_favorites')
export class UserFavorite {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  imdb_id: number
  
  @Column({ type: 'timestamp with time zone', default: 'now()' })
  date_modified: Date
  
  @Column({ type: 'text' })
  category: string
  
  @Column({ type: 'text' })
  movie_name: string
  
  @ManyToOne(() => User, user => user.favorites)
  @JoinColumn({ name: 'user_id' })
  user: User
}