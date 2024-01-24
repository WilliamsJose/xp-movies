import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1706127953439 implements MigrationInterface {
    name = 'Default1706127953439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_8b17d96feeb16ba6795de03fa16"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "movieId"`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "category_id" integer`);
        await queryRunner.query(`ALTER TABLE "movies" ALTER COLUMN "date_modified" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "user_favorites" ALTER COLUMN "date_modified" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "date_modified" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "movies" ADD CONSTRAINT "FK_e4e606ce820f33facbca2b07f5d" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP CONSTRAINT "FK_e4e606ce820f33facbca2b07f5d"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "date_modified" SET DEFAULT '2024-01-24 20:24:17.608794+00'`);
        await queryRunner.query(`ALTER TABLE "user_favorites" ALTER COLUMN "date_modified" SET DEFAULT '2024-01-24 20:24:17.608794+00'`);
        await queryRunner.query(`ALTER TABLE "movies" ALTER COLUMN "date_modified" SET DEFAULT '2024-01-24 20:24:17.608794+00'`);
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "movieId" integer`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_8b17d96feeb16ba6795de03fa16" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
