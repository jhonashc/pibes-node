import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserOtp1685736529361 implements MigrationInterface {
    name = 'CreateUserOtp1685736529361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_otp" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" text NOT NULL, "expiration_date" TIMESTAMP NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "REL_7c4b83e0619128a0b57da32228" UNIQUE ("user_id"), CONSTRAINT "PK_494c022ed33e6ee19a2bbb11b22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_otp" ADD CONSTRAINT "FK_7c4b83e0619128a0b57da32228c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_otp" DROP CONSTRAINT "FK_7c4b83e0619128a0b57da32228c"`);
        await queryRunner.query(`DROP TABLE "user_otp"`);
    }

}
