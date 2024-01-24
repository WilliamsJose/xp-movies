import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1706126734408 implements MigrationInterface {
    name = 'Default1706126734408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
        await queryRunner.query(`ALTER TABLE "movies" ALTER COLUMN "date_modified" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "user_favorites" ALTER COLUMN "date_modified" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "date_modified" SET DEFAULT 'now()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "date_modified" SET DEFAULT '2024-01-24 20:00:08.909338+00'`);
        await queryRunner.query(`ALTER TABLE "user_favorites" ALTER COLUMN "date_modified" SET DEFAULT '2024-01-24 20:00:08.909338+00'`);
        await queryRunner.query(`ALTER TABLE "movies" ALTER COLUMN "date_modified" SET DEFAULT '2024-01-24 20:00:08.909338+00'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" text`);
    }

}
