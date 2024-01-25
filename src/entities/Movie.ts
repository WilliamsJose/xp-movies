import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserMovie } from "./UserMovie";
import { MovieCategory } from "./MovieCategory";

@Entity('movie')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'imdb_id' })
  imdbId: string
  
  @Column({ name: 'created_at', type: 'timestamp with time zone', default: 'NOW()' })
  createdAt: Date

  @Column({ name: 'updated_at', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date
  
  @Column({ type: 'text' })
  title: string
  
  @OneToMany(() => MovieCategory, movieCategory => movieCategory.movie)
  movieCategory: MovieCategory[]

  @OneToMany(() => UserMovie, userMovie => userMovie.movie)
  userMovies: UserMovie[]
}