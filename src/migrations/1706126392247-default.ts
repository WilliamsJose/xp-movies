import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1706126392247 implements MigrationInterface {
    name = 'Default1706126392247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "title" text NOT NULL, "movieId" integer, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movies" ("id" SERIAL NOT NULL, "imdb_id" integer NOT NULL, "date_modified" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "title" text NOT NULL, CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_tokens" ("id" SERIAL NOT NULL, "refresh_token" character varying NOT NULL, "user_id" integer, CONSTRAINT "REL_9e144a67be49e5bba91195ef5d" UNIQUE ("user_id"), CONSTRAINT "PK_63764db9d9aaa4af33e07b2f4bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" text`);
        await queryRunner.query(`ALTER TABLE "user_favorites" ADD "movie_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "date_modified" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "user_favorites" ALTER COLUMN "date_modified" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_8b17d96feeb16ba6795de03fa16" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_favorites" ADD CONSTRAINT "FK_c7c9b895cb540805248b627671f" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tokens" ADD CONSTRAINT "FK_9e144a67be49e5bba91195ef5de" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tokens" DROP CONSTRAINT "FK_9e144a67be49e5bba91195ef5de"`);
        await queryRunner.query(`ALTER TABLE "user_favorites" DROP CONSTRAINT "FK_c7c9b895cb540805248b627671f"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_8b17d96feeb16ba6795de03fa16"`);
        await queryRunner.query(`ALTER TABLE "user_favorites" ALTER COLUMN "date_modified" SET DEFAULT '2024-01-23 14:09:16.799926+00'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "date_modified" SET DEFAULT '2024-01-23 14:09:16.799926+00'`);
        await queryRunner.query(`ALTER TABLE "user_favorites" DROP COLUMN "movie_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
        await queryRunner.query(`DROP TABLE "user_tokens"`);
        await queryRunner.query(`DROP TABLE "movies"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
