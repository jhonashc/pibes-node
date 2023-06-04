import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePromotionAndProductPromotion1685736855891 implements MigrationInterface {
    name = 'CreatePromotionAndProductPromotion1685736855891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."promotion_available_day_enum" AS ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY')`);
        await queryRunner.query(`CREATE TABLE "promotion" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "description" text, "image_url" text, "discount_percentage" integer NOT NULL DEFAULT '0', "available_day" "public"."promotion_available_day_enum" NOT NULL, CONSTRAINT "UQ_7dc10a09d1f198907d448e67425" UNIQUE ("name"), CONSTRAINT "PK_fab3630e0789a2002f1cadb7d38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_promotion" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "product_id" uuid NOT NULL, "promotion_id" uuid NOT NULL, CONSTRAINT "PK_a5bad981de3e7598c32e2181bf0" PRIMARY KEY ("product_id", "promotion_id"))`);
        await queryRunner.query(`ALTER TABLE "product_promotion" ADD CONSTRAINT "FK_c2f8b731b2fee4d3b36eb71fecf" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_promotion" ADD CONSTRAINT "FK_ee23c184406707dda17d658b335" FOREIGN KEY ("promotion_id") REFERENCES "promotion"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_promotion" DROP CONSTRAINT "FK_ee23c184406707dda17d658b335"`);
        await queryRunner.query(`ALTER TABLE "product_promotion" DROP CONSTRAINT "FK_c2f8b731b2fee4d3b36eb71fecf"`);
        await queryRunner.query(`DROP TABLE "product_promotion"`);
        await queryRunner.query(`DROP TABLE "promotion"`);
        await queryRunner.query(`DROP TYPE "public"."promotion_available_day_enum"`);
    }

}
