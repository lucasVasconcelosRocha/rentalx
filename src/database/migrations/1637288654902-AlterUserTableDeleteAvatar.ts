import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserTableDeleteAvatar1637288654902
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "avatar");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "avatar",
        type: "varchar",
      })
    );
  }
}
