import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: process.env.DB_DRIVER_NAME as any,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT as number | undefined,
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
})