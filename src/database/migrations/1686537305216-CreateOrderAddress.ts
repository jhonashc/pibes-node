import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderAddress1686537305216 implements MigrationInterface {
    name = 'CreateOrderAddress1686537305216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "address_id" uuid`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_f07603e96b068aae820d4590270" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_f07603e96b068aae820d4590270"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "address_id"`);
    }

}
