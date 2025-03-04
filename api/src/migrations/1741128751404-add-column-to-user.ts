import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToUser1741128751404 implements MigrationInterface {
    name = 'AddColumnToUser1741128751404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "last_name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_name"`);
    }

}
