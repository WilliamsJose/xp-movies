import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1706014523053 implements MigrationInterface {
    name = 'Default1706014523053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "date_modified"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "date_modified" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_favorites" DROP COLUMN "date_modified"`);
        await queryRunner.query(`ALTER TABLE "user_favorites" ADD "date_modified" TIMESTAMP NOT NULL DEFAULT 'now()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_favorites" DROP COLUMN "date_modified"`);
        await queryRunner.query(`ALTER TABLE "user_favorites" ADD "date_modified" date NOT NULL DEFAULT '2024-01-23'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "date_modified"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "date_modified" character varying NOT NULL`);
    }

}
