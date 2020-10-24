import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createOrphanages1602603374783 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		//Alterar dados no DB, ex.: criar tabela
		await queryRunner.createTable(new Table(
			{
				name: "orphanages",
				columns: [
					{
						name: "id",
						type: "integer",
						"isPrimary": true,
						isGenerated: true,
						generationStrategy: "increment",
					},
					{
						name: "name",
						type: "varchar",
					},
					{
						name: "latitude",
						type: "decimal",
						scale: 10,
						precision: 2
					},
					{
						name: "longitude",
						type: "decimal",
						scale: 10,
						precision: 2
					},
					{
						name: "about",
						type: "text",
					},
					{
						name: "instructions",
						type: "text",
					},
					{
						name: "opening_hours",
						type: "varchar",
					},
					{
						name: "open_on_weekends",
						type: "boolean",
						default: false
					},
				]
			}), true)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		//Defazer alterações do up
		await queryRunner.dropTable("orphanages")
	}
}
