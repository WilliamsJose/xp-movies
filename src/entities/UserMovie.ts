import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Movie } from "./Movie";

@Entity('user_movie')
export class UserMovie {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({ type: 'timestamp with time zone', default: 'now()' })
  created_at: Date
  
  @Column({ type: 'timestamp with time zone', default: 'now()', onUpdate: 'now()' })
  updated_at: Date
  
  @ManyToOne(() => User, user => user.movie)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => Movie, movie => movie.userMovies)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie
}