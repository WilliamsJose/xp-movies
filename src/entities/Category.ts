import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { MovieCategory } from './'
import { ICategory } from '../interfaces/entities'

@Entity('category')
export class Category implements ICategory {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column({ type: 'text' })
  title: string

  @OneToMany(() => MovieCategory, (movieCategory) => movieCategory.category)
  movieCategory: MovieCategory[]
}
