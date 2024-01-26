import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Movie } from "./Movie";
import { Category } from "./Category";

@Entity('movie_category')
export class MovieCategory {
  @PrimaryGeneratedColumn()
  id: number
  
  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date
  
  @ManyToOne(() => Category, category => category.movieCategory)
  @JoinColumn({ name: 'category_id', foreignKeyConstraintName: 'fk_moviecategory_category' })
  category: Category

  @ManyToOne(() => Movie, movie => movie.movieCategory)
  @JoinColumn({ name: 'movie_id', foreignKeyConstraintName: 'fk_moviecategory_movie' })
  movie: Movie
}