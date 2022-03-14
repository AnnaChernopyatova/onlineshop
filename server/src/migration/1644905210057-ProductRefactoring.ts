import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductRefactoring1644905210057 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product_orm_entity" RENAME COLUMN "name" TO "title" `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product_orm_entity" RENAME COLUMN "title" TO "name" `);
  }
}
