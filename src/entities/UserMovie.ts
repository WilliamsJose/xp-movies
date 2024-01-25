import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Movie } from "./Movie";

@Entity('user_movie')
export class UserMovie {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({ name: 'created_at', type: 'timestamp with time zone', default: 'NOW()' })
  createdAt: Date

  @Column({ name: 'updated_at', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date
  
  @ManyToOne(() => User, user => user.movie)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => Movie, movie => movie.userMovies)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie
}