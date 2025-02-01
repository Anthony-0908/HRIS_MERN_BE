import { MigrationInterface, QueryRunner } from "typeorm";

export class Roles1738421355120 implements MigrationInterface {
    name = 'Roles1738421355120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`roleName\` varchar(255) NOT NULL, \`roleDescription\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`position\` (\`id\` int NOT NULL AUTO_INCREMENT, \`PositionName\` varchar(255) NOT NULL, \`Description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`employeeId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`address\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`contactNumber\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`position\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`department\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`salaryGrade\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`salaryGrade\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`department\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`position\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`contactNumber\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`address\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`employeeId\``);
        await queryRunner.query(`DROP TABLE \`position\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
    }

}
