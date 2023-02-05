import { Employee } from "src/employee/entities/employee.entity";
import { MigrationInterface, QueryRunner } from "typeorm"
import * as md5 from "md5";

export class Seed1675539772141 implements MigrationInterface {
    name = 'Seed1675539772141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.save(
            queryRunner.manager.create<Employee>(Employee, {
                username: "admin",
                fullname: "Admin",
                password: md5("admin")
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE * FROM employee WHERE username = "admin"`);
    }

}
