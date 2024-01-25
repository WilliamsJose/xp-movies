import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1706217741454 implements MigrationInterface {
    name = 'Default1706217741454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "movie_category" ALTER COLUMN "created_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "movie_category" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "created_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_movie" ALTER COLUMN "created_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "user_movie" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_token" ALTER COLUMN "created_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "user_token" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_token" ALTER COLUMN "updated_at" SET DEFAULT '2024-01-25 20:59:26.977004+00'`);
        await queryRunner.query(`ALTER TABLE "user_token" ALTER COLUMN "created_at" SET DEFAULT '2024-01-25 20:59:26.977004+00'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT '2024-01-25 20:59:26.977004+00'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '2024-01-25 20:59:26.977004+00'`);
        await queryRunner.query(`ALTER TABLE "user_movie" ALTER COLUMN "updated_at" SET DEFAULT '2024-01-25 20:59:26.977004+00'`);
        await queryRunner.query(`ALTER TABLE "user_movie" ALTER COLUMN "created_at" SET DEFAULT '2024-01-25 20:59:26.977004+00'`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "updated_at" SET DEFAULT '2024-01-25 20:59:26.977004+00'`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "created_at" SET DEFAULT '2024-01-25 20:59:26.977004+00'`);
        await queryRunner.query(`ALTER TABLE "movie_category" ALTER COLUMN "updated_at" SET DEFAULT '2024-01-25 20:59:26.977004+00'`);
        await queryRunner.query(`ALTER TABLE "movie_category" ALTER COLUMN "created_at" SET DEFAULT '2024-01-25 20:59:26.977004+00'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "updated_at" SET DEFAULT '2024-01-25 20:59:26.977004+00'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT '2024-01-25 20:59:26.977004+00'`);
    }

}
