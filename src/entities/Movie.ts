import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserMovie } from "./UserMovie";
import { MovieCategory } from "./MovieCategory";

@Entity('movie')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  imdb_id: number
  
  @Column({ type: 'timestamp with time zone', default: 'now()' })
  created_at: Date

  @Column({ type: 'timestamp with time zone', default: 'now()', onUpdate: 'now()' })
  updated_at: Date
  
  @Column({ type: 'text' })
  title: string
  
  @OneToMany(() => MovieCategory, movieCategory => movieCategory.movie)
  movieCategory: MovieCategory[]

  @OneToMany(() => UserMovie, userMovie => userMovie.movie)
  userMovies: UserMovie[]
}