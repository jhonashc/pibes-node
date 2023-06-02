import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderAndOrderDetail1685736735635 implements MigrationInterface {
    name = 'CreateOrderAndOrderDetail1685736735635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_detail" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" uuid NOT NULL, "order_id" uuid NOT NULL, "quantity" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_53c03261c674a4a5e6d27848888" PRIMARY KEY ("id", "product_id", "order_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."order_delivery_status_enum" AS ENUM('ON TRACK', 'DELIVERED')`);
        await queryRunner.query(`CREATE TYPE "public"."order_delivery_type_enum" AS ENUM('TAKE YOURSELF', 'DELIVERY')`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('PENDING', 'IN PROGRESS', 'COMPLETED', 'REJECTED')`);
        await queryRunner.query(`CREATE TYPE "public"."order_payment_method_enum" AS ENUM('CASH', 'TRANSFER')`);
        await queryRunner.query(`CREATE TABLE "order" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "delivery_status" "public"."order_delivery_status_enum", "delivery_type" "public"."order_delivery_type_enum" NOT NULL, "status" "public"."order_status_enum" NOT NULL DEFAULT 'PENDING', "payment_method" "public"."order_payment_method_enum" NOT NULL DEFAULT 'CASH', "total" double precision NOT NULL DEFAULT '0', "user_id" uuid NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_985d5f728e1eebe4a3eabc43aac" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_a6ac5c99b8c02bd4ee53d3785be" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd"`);
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_a6ac5c99b8c02bd4ee53d3785be"`);
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_985d5f728e1eebe4a3eabc43aac"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_payment_method_enum"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."order_delivery_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."order_delivery_status_enum"`);
        await queryRunner.query(`DROP TABLE "order_detail"`);
    }

}
