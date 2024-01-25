import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MovieCategory } from "./MovieCategory";

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'timestamp with time zone', default: 'now()' })
  created_at: Date

  @Column({ type: 'timestamp with time zone', default: 'now()', onUpdate: 'now()' })
  updated_at: Date
  
  @Column({ type: 'text' })
  title: string
  
  @OneToMany(() => MovieCategory, movieCategory => movieCategory.category)
  movieCategory: MovieCategory[]
}