import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPartys1603075261884 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(new Table({
            name: 'partys',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'whatsapp',
                    type: 'varchar',
                    isNullable: false,
                    length: '20',
                },
                {
                    name: 'uf',
                    type: 'char',
                    isNullable: false,
                    length: '2',
                },
                {
                    name: 'city',
                    type: 'varchar',
                    isNullable: false,
                    length: '60',
                },
                {
                    name: 'party_name',
                    type: 'varchar',
                    isNullable: false,
                    length: '100',
                },
                {
                    name: 'type_party',
                    type: 'varchar',
                    isNullable: false,
                    length: '100',
                },
                {
                    name: 'description',
                    type: 'varchar',
                    length: '200',
                },
                {
                    name: 'date_time',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'latitude',
                    type: 'numeric',
                    isNullable: false,
                },
                {
                    name: 'longitude',
                    type: 'numeric',
                    isNullable: false,
                },
                {
                    name: 'user_id',
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
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('partys');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');

    }

}
