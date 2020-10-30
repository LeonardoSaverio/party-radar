import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createFavorites1603075277101 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(new Table({
            name: 'favorites',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'isFavorited',
                    type: 'boolean',
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                    isNullable: false,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'party_id',
                    type: 'uuid',
                    isNullable: false,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
            ],
            foreignKeys: [
                {
                    name: 'user_id',
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                {
                    name: 'party_id',
                    columnNames: ['party_id'],
                    referencedTableName: 'partys',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('favorites');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}
