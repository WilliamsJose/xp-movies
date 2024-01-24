import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserFavorite } from "./UserFavorite";
import { Category } from "./Category";

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  imdb_id: number
  
  @Column({ type: 'timestamp with time zone', default: 'now()' })
  date_modified: Date
  
  @Column({ type: 'text' })
  title: string
  
  @ManyToOne(() => Category, category => category.movie)
  @JoinColumn({ name: 'category_id' })
  categories: Category[]

  @OneToMany(() => UserFavorite, favorite => favorite.movie)
  favorites: UserFavorite[]
}