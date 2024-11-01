import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm'
import { Movie, Category } from './'
import { IMovieCategory } from '../domains/entities'

@Entity('movie_category')
@Unique(['category', 'movie'])
export class MovieCategory implements IMovieCategory {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at'})
  updatedAt: Date

  @ManyToOne(() => Category, (category) => category.movieCategory)
  @JoinColumn({ name: 'category_id', foreignKeyConstraintName: 'fk_moviecategory_category' })
  category: Category

  @ManyToOne(() => Movie, (movie) => movie.movieCategory)
  @JoinColumn({ name: 'movie_id', foreignKeyConstraintName: 'fk_moviecategory_movie' })
  movie: Movie
}
