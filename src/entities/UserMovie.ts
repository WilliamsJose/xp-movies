import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Movie } from "./Movie";

@Entity('user_movie')
export class UserMovie {
  @PrimaryGeneratedColumn()
  id: number
  
  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date
  
  @ManyToOne(() => User, user => user.movie)
  @JoinColumn({ name: 'user_id', foreignKeyConstraintName: 'fk_usermovie_user' })
  user: User

  @ManyToOne(() => Movie, movie => movie.userMovies)
  @JoinColumn({ name: 'movie_id', foreignKeyConstraintName: 'fk_usermovie_movie' })
  movie: Movie
}