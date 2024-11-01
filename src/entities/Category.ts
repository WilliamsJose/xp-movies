import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { MovieCategory } from './'
import { ICategory } from '../domains/entities'

@Entity('category')
export class Category implements ICategory {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at'})
  updatedAt: Date

  @Column({ type: 'text' })
  title: string

  @OneToMany(() => MovieCategory, (movieCategory) => movieCategory.category)
  movieCategory: MovieCategory[]
}
