import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePromotion1686843797176 implements MigrationInterface {
    name = 'UpdatePromotion1686843797176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "promotion" ADD "price" double precision NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "promotion" DROP COLUMN "price"`);
    }

}
