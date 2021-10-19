import {MigrationInterface, QueryRunner} from "typeorm";

export default class RelationContentLesson1634611784622 implements MigrationInterface {
    name = 'RelationContentLesson1634611784622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "class" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "duration" integer NOT NULL, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "update_At" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_574dd394846fb85d495d0f77dfd" UNIQUE ("name"), CONSTRAINT "PK_0b9024d21bdfba8b1bd1c300eae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "content" ADD "lessonId" uuid`);
        await queryRunner.query(`ALTER TABLE "content" ADD CONSTRAINT "UQ_0b349f6b8ca7f05eed39ffb956d" UNIQUE ("lessonId")`);
        await queryRunner.query(`ALTER TABLE "content" ADD CONSTRAINT "FK_0b349f6b8ca7f05eed39ffb956d" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content" DROP CONSTRAINT "FK_0b349f6b8ca7f05eed39ffb956d"`);
        await queryRunner.query(`ALTER TABLE "content" DROP CONSTRAINT "UQ_0b349f6b8ca7f05eed39ffb956d"`);
        await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "lessonId"`);
        await queryRunner.query(`DROP TABLE "class"`);
    }

}
