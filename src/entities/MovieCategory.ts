import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./Movie";
import { Category } from "./Category";

@Entity('movie_category')
export class MovieCategory {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({ name: 'created_at', type: 'timestamp with time zone', default: 'NOW()' })
  createdAt: Date

  @Column({ name: 'updated_at', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date
  
  @ManyToOne(() => Category, category => category.movieCategory)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @ManyToOne(() => Movie, movie => movie.movieCategory)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie
}