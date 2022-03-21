import {MigrationInterface, QueryRunner} from "typeorm";

export class Pri1647893585338 implements MigrationInterface {
    name = 'Pri1647893585338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "afiliado" ("id" int NOT NULL IDENTITY(1,1), "numA" int NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_2f66089317ac9bd2e91cb556956" DEFAULT getdate(), "id_commerce" int, CONSTRAINT "PK_94805be1f1c0d60a1b6fbf548b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_5cf3b24f0c09c49fa54724b681" ON "afiliado" ("id_commerce") WHERE "id_commerce" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "commerce" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "ident_num" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_8e20e04888c10684f887e29e5c0" DEFAULT getdate(), "id_ident_type" int, "client" int, "afiliado" int, CONSTRAINT "PK_18731343cc862b903699fb5c02e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b2921ba8d4495f4864ad96ee0a" ON "commerce" ("id_ident_type", "ident_num") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_206fc486832dba39a82ef9863e" ON "commerce" ("client") WHERE "client" IS NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_da37579494b867267abb7a395b" ON "commerce" ("afiliado") WHERE "afiliado" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "users" ("id" int NOT NULL IDENTITY(1,1), "email" nvarchar(255) NOT NULL, "password" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_204e9b624861ff4a5b268192101" DEFAULT getdate(), "id_client" int, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_77c4652d198b00479710608cfd" ON "users" ("id_client") WHERE "id_client" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "client" ("id" int NOT NULL IDENTITY(1,1), "ident_num" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_363a7099b6a83740f25e00b86d4" DEFAULT getdate(), "id_ident_type" int, "user" int, "id_commerce" int, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b7c1f20439458692d59bf7e9e2" ON "client" ("id_ident_type", "ident_num") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_f22a36fd27e326705079b76c4a" ON "client" ("user") WHERE "user" IS NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_6485ad8cca3a4e7c1870d26a95" ON "client" ("id_commerce") WHERE "id_commerce" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "ident_type" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_ee232f62ceda90eacb45f9bc057" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_40290dbad52905589f05693deab" DEFAULT getdate(), CONSTRAINT "PK_18140d59232da5dd2dc600561f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "afiliado" ADD CONSTRAINT "FK_5cf3b24f0c09c49fa54724b6814" FOREIGN KEY ("id_commerce") REFERENCES "commerce"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commerce" ADD CONSTRAINT "FK_df801ea9fd656a22a333c6ae582" FOREIGN KEY ("id_ident_type") REFERENCES "ident_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commerce" ADD CONSTRAINT "FK_206fc486832dba39a82ef9863e5" FOREIGN KEY ("client") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commerce" ADD CONSTRAINT "FK_da37579494b867267abb7a395b0" FOREIGN KEY ("afiliado") REFERENCES "afiliado"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_77c4652d198b00479710608cfd4" FOREIGN KEY ("id_client") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_afa964c1fb86d41ecf14db1ddac" FOREIGN KEY ("id_ident_type") REFERENCES "ident_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_f22a36fd27e326705079b76c4ae" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_6485ad8cca3a4e7c1870d26a95a" FOREIGN KEY ("id_commerce") REFERENCES "commerce"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_6485ad8cca3a4e7c1870d26a95a"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_f22a36fd27e326705079b76c4ae"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_afa964c1fb86d41ecf14db1ddac"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_77c4652d198b00479710608cfd4"`);
        await queryRunner.query(`ALTER TABLE "commerce" DROP CONSTRAINT "FK_da37579494b867267abb7a395b0"`);
        await queryRunner.query(`ALTER TABLE "commerce" DROP CONSTRAINT "FK_206fc486832dba39a82ef9863e5"`);
        await queryRunner.query(`ALTER TABLE "commerce" DROP CONSTRAINT "FK_df801ea9fd656a22a333c6ae582"`);
        await queryRunner.query(`ALTER TABLE "afiliado" DROP CONSTRAINT "FK_5cf3b24f0c09c49fa54724b6814"`);
        await queryRunner.query(`DROP TABLE "ident_type"`);
        await queryRunner.query(`DROP INDEX "REL_6485ad8cca3a4e7c1870d26a95" ON "client"`);
        await queryRunner.query(`DROP INDEX "REL_f22a36fd27e326705079b76c4a" ON "client"`);
        await queryRunner.query(`DROP INDEX "IDX_b7c1f20439458692d59bf7e9e2" ON "client"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP INDEX "REL_77c4652d198b00479710608cfd" ON "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "REL_da37579494b867267abb7a395b" ON "commerce"`);
        await queryRunner.query(`DROP INDEX "REL_206fc486832dba39a82ef9863e" ON "commerce"`);
        await queryRunner.query(`DROP INDEX "IDX_b2921ba8d4495f4864ad96ee0a" ON "commerce"`);
        await queryRunner.query(`DROP TABLE "commerce"`);
        await queryRunner.query(`DROP INDEX "REL_5cf3b24f0c09c49fa54724b681" ON "afiliado"`);
        await queryRunner.query(`DROP TABLE "afiliado"`);
    }

}
