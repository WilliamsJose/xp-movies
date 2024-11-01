import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { UserMovie, MovieCategory } from './'
import { IMovie } from '../domains/entities'

@Entity('movie')
export class Movie implements IMovie {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'imdb_id' })
  imdbId: string

  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at'})
  updatedAt: Date

  @Column({ type: 'text' })
  title: string

  @OneToMany(() => MovieCategory, (movieCategory) => movieCategory.movie)
  movieCategory: MovieCategory[]

  @OneToMany(() => UserMovie, (userMovie) => userMovie.movie)
  userMovies: UserMovie[]
}
