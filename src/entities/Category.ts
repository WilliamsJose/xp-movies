import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MovieCategory } from "./MovieCategory";

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'created_at', type: 'timestamp with time zone', default: 'NOW()' })
  createdAt: Date

  @Column({ name: 'updated_at', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date
  
  @Column({ type: 'text' })
  title: string
  
  @OneToMany(() => MovieCategory, movieCategory => movieCategory.category)
  movieCategory: MovieCategory[]
}