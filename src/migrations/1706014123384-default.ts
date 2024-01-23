import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1706014123384 implements MigrationInterface {
    name = 'Default1706014123384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_favorites" ("id" SERIAL NOT NULL, "imdb_id" integer NOT NULL, "date_modified" date NOT NULL DEFAULT 'now()', "category" text NOT NULL, "movie_name" text NOT NULL, "user_id" integer, CONSTRAINT "PK_6c472a19a7423cfbbf6b7c75939" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "date_modified" character varying NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_favorites" ADD CONSTRAINT "FK_5238ce0a21cc77dc16c8efe3d36" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_favorites" DROP CONSTRAINT "FK_5238ce0a21cc77dc16c8efe3d36"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_favorites"`);
    }

}
