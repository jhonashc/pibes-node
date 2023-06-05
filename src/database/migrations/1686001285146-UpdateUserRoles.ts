import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserRoles1686001285146 implements MigrationInterface {
    name = 'UpdateUserRoles1686001285146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."user_roles_enum" RENAME TO "user_roles_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_roles_enum" AS ENUM('USER', 'ADMIN')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "roles" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "roles" TYPE "public"."user_roles_enum"[] USING "roles"::"text"::"public"."user_roles_enum"[]`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "roles" SET DEFAULT '{USER}'`);
        await queryRunner.query(`DROP TYPE "public"."user_roles_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_roles_enum_old" AS ENUM('USER', 'ADVANCED', 'USERADMIN', 'ADMIN')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "roles" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "roles" TYPE "public"."user_roles_enum_old"[] USING "roles"::"text"::"public"."user_roles_enum_old"[]`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "roles" SET DEFAULT '{USER}'`);
        await queryRunner.query(`DROP TYPE "public"."user_roles_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_roles_enum_old" RENAME TO "user_roles_enum"`);
    }

}
