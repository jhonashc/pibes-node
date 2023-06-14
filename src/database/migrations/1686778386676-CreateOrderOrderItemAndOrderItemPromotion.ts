import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderOrderItemAndOrderItemPromotion1686778386676 implements MigrationInterface {
    name = 'CreateOrderOrderItemAndOrderItemPromotion1686778386676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_item_promotion" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "promotion_id" uuid NOT NULL, "order_item_id" uuid NOT NULL, CONSTRAINT "PK_23403d07a5c93f652c18a450a00" PRIMARY KEY ("promotion_id", "order_item_id"))`);
        await queryRunner.query(`CREATE TABLE "order_item" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL DEFAULT '1', "product_id" uuid NOT NULL, "order_id" uuid NOT NULL, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."order_delivery_status_enum" AS ENUM('ON TRACK', 'DELIVERED')`);
        await queryRunner.query(`CREATE TYPE "public"."order_delivery_type_enum" AS ENUM('TAKE YOURSELF', 'DELIVERY')`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('PENDING', 'IN PROGRESS', 'COMPLETED', 'REJECTED')`);
        await queryRunner.query(`CREATE TYPE "public"."order_payment_method_enum" AS ENUM('CASH', 'TRANSFER')`);
        await queryRunner.query(`CREATE TABLE "order" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "delivery_status" "public"."order_delivery_status_enum", "delivery_type" "public"."order_delivery_type_enum" NOT NULL, "status" "public"."order_status_enum" NOT NULL DEFAULT 'PENDING', "payment_method" "public"."order_payment_method_enum" NOT NULL DEFAULT 'CASH', "total" double precision NOT NULL DEFAULT '0', "user_id" uuid NOT NULL, "address_id" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order_item_promotion" ADD CONSTRAINT "FK_1440bcbdbdd7ac39d2d5c246ef5" FOREIGN KEY ("promotion_id") REFERENCES "promotion"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item_promotion" ADD CONSTRAINT "FK_22ae80b647f9fec7ec28740ecb3" FOREIGN KEY ("order_item_id") REFERENCES "order_item"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_5e17c017aa3f5164cb2da5b1c6b" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_e9674a6053adbaa1057848cddfa" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_f07603e96b068aae820d4590270" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_f07603e96b068aae820d4590270"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_e9674a6053adbaa1057848cddfa"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_5e17c017aa3f5164cb2da5b1c6b"`);
        await queryRunner.query(`ALTER TABLE "order_item_promotion" DROP CONSTRAINT "FK_22ae80b647f9fec7ec28740ecb3"`);
        await queryRunner.query(`ALTER TABLE "order_item_promotion" DROP CONSTRAINT "FK_1440bcbdbdd7ac39d2d5c246ef5"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_payment_method_enum"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."order_delivery_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."order_delivery_status_enum"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "order_item_promotion"`);
    }

}
