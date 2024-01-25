import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./Movie";
import { Category } from "./Category";

@Entity('movie_category')
export class MovieCategory {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({ type: 'timestamp with time zone', default: 'now()' })
  created_at: Date

  @Column({ type: 'timestamp with time zone', default: 'now()', onUpdate: 'now()' })
  updated_at: Date
  
  @ManyToOne(() => Category, category => category.movieCategory)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @ManyToOne(() => Movie, movie => movie.movieCategory)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie
}