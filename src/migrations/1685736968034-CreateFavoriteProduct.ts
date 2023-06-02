import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFavoriteProduct1685736968034 implements MigrationInterface {
    name = 'CreateFavoriteProduct1685736968034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorite_product" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "product_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_1f38b98c2d3395e7ec9ad3c2502" PRIMARY KEY ("product_id", "user_id"))`);
        await queryRunner.query(`ALTER TABLE "favorite_product" ADD CONSTRAINT "FK_e8a2e36c5e33dc12de4169a6f8a" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_product" ADD CONSTRAINT "FK_a21c00544c6e01fa89c1f3496a4" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_product" DROP CONSTRAINT "FK_a21c00544c6e01fa89c1f3496a4"`);
        await queryRunner.query(`ALTER TABLE "favorite_product" DROP CONSTRAINT "FK_e8a2e36c5e33dc12de4169a6f8a"`);
        await queryRunner.query(`DROP TABLE "favorite_product"`);
    }

}
