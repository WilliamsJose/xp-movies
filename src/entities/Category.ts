import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./Movie";

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({ type: 'text' })
  title: string
  
  @OneToMany(() => Movie, movie => movie.categories)
  movie: Movie
}