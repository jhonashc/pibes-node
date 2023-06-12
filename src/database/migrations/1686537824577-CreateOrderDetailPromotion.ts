import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderDetailPromotion1686537824577 implements MigrationInterface {
    name = 'CreateOrderDetailPromotion1686537824577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_detail" ADD "promotion_id" uuid`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_c00afe6122b0f1d500750cfe978" FOREIGN KEY ("promotion_id") REFERENCES "promotion"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_c00afe6122b0f1d500750cfe978"`);
        await queryRunner.query(`ALTER TABLE "order_detail" DROP COLUMN "promotion_id"`);
    }

}
