import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCommonData1636329061464 implements MigrationInterface {
    name = 'CreateCommonData1636329061464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson" RENAME COLUMN "updated_At" TO "update_At"`);
        await queryRunner.query(`ALTER TABLE "student" RENAME COLUMN "updated_At" TO "update_At"`);
        await queryRunner.query(`ALTER TABLE "content" ADD "created_At" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "content" ADD "update_At" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "update_At"`);
        await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "created_At"`);
        await queryRunner.query(`ALTER TABLE "student" RENAME COLUMN "update_At" TO "updated_At"`);
        await queryRunner.query(`ALTER TABLE "lesson" RENAME COLUMN "update_At" TO "updated_At"`);
    }

}
