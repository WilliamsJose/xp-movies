import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm'
import { User, Movie } from './'
import { IUserMovie } from '../domains/entities'

@Entity('user_movie')
@Unique(['user', 'movie'])
export class UserMovie implements IUserMovie {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at'})
  updatedAt: Date

  @ManyToOne(() => User, (user) => user.movie)
  @JoinColumn({ name: 'user_id', foreignKeyConstraintName: 'fk_usermovie_user' })
  user: User

  @ManyToOne(() => Movie, (movie) => movie.userMovies)
  @JoinColumn({ name: 'movie_id', foreignKeyConstraintName: 'fk_usermovie_movie' })
  movie: Movie
}
