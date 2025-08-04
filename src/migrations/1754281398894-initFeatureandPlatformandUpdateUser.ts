import { MigrationInterface, QueryRunner } from "typeorm";

export class InitFeatureandPlatformandUpdateUser1754281398894 implements MigrationInterface {
    name = 'InitFeatureandPlatformandUpdateUser1754281398894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "platform" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "allowedPrefixes" text NOT NULL, "disabledMethods" text NOT NULL, CONSTRAINT "PK_c33d6abeebd214bd2850bfd6b8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "feature_toggle" ("id" SERIAL NOT NULL, "feature" character varying NOT NULL, "isEnabled" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_e5ade0d433c32bec4e53aa14e76" UNIQUE ("feature"), CONSTRAINT "PK_495a4239fe647b9c8f9b7767338" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_platform" ("user_id" integer NOT NULL, "platform_id" integer NOT NULL, CONSTRAINT "PK_062ecf4c8957191dc0571eee949" PRIMARY KEY ("user_id", "platform_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e2dba5d47b4196ad1c64c69334" ON "user_platform" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ca5b7394dd68bdd762ddb0de15" ON "user_platform" ("platform_id") `);
        await queryRunner.query(`ALTER TABLE "user_platform" ADD CONSTRAINT "FK_e2dba5d47b4196ad1c64c693347" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_platform" ADD CONSTRAINT "FK_ca5b7394dd68bdd762ddb0de15a" FOREIGN KEY ("platform_id") REFERENCES "platform"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_platform" DROP CONSTRAINT "FK_ca5b7394dd68bdd762ddb0de15a"`);
        await queryRunner.query(`ALTER TABLE "user_platform" DROP CONSTRAINT "FK_e2dba5d47b4196ad1c64c693347"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ca5b7394dd68bdd762ddb0de15"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e2dba5d47b4196ad1c64c69334"`);
        await queryRunner.query(`DROP TABLE "user_platform"`);
        await queryRunner.query(`DROP TABLE "feature_toggle"`);
        await queryRunner.query(`DROP TABLE "platform"`);
    }

}
