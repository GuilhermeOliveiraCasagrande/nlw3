import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImages1602627574068 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
            columns: [
                {
                    name: "id",
                    type: "integer",
                    "isPrimary": true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: 'path',
                    type: 'varchar'
                },
                /* Um orfanto, muitas imagens -> One to many -> coloca o id do orfanato na foto */
                {
                    name: 'orphanage_id',
                    type: 'integer'
                }
            ],
            foreignKeys: [
                {
                    name: "ImageOrphanage",
                    columnNames: ['orphanage_id'],
                    referencedTableName: "orphanages",
                    referencedColumnNames: ["id"],
                    onUpdate: "CASCADE", /* Mudou o id do orfanato, já muda o id na image */
                    onDelete: "CASCADE" /* Deletou o orfanato, vai todas as imagens dele junto */
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("images")
    }

}
