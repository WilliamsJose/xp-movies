import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1706132101228 implements MigrationInterface {
    name = 'Default1706132101228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_favorites" DROP COLUMN "imdb_id"`);
        await queryRunner.query(`ALTER TABLE "user_favorites" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "user_favorites" DROP COLUMN "movie_name"`);
        await queryRunner.query(`ALTER TABLE "movies" ALTER COLUMN "date_modified" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "user_favorites" ALTER COLUMN "date_modified" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "date_modified" SET DEFAULT 'now()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "date_modified" SET DEFAULT '2024-01-24 20:25:58.720162+00'`);
        await queryRunner.query(`ALTER TABLE "user_favorites" ALTER COLUMN "date_modified" SET DEFAULT '2024-01-24 20:25:58.720162+00'`);
        await queryRunner.query(`ALTER TABLE "movies" ALTER COLUMN "date_modified" SET DEFAULT '2024-01-24 20:25:58.720162+00'`);
        await queryRunner.query(`ALTER TABLE "user_favorites" ADD "movie_name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_favorites" ADD "category" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_favorites" ADD "imdb_id" integer NOT NULL`);
    }

}
