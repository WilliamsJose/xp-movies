import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1706014775395 implements MigrationInterface {
    name = 'Default1706014775395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "date_modified"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "date_modified" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "user_favorites" DROP COLUMN "date_modified"`);
        await queryRunner.query(`ALTER TABLE "user_favorites" ADD "date_modified" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_favorites" DROP COLUMN "date_modified"`);
        await queryRunner.query(`ALTER TABLE "user_favorites" ADD "date_modified" TIMESTAMP NOT NULL DEFAULT '2024-01-23 12:55:29.626018'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "date_modified"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "date_modified" TIMESTAMP NOT NULL`);
    }

}
