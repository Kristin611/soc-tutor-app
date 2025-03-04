import { MigrationInterface, QueryRunner } from "typeorm";

export class DropColumnFromUser1741129330604 implements MigrationInterface {
    name = 'DropColumnFromUser1741129330604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "last_name" character varying NOT NULL`);
    }

}
