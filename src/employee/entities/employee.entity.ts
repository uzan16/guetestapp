import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({unique: true})
    username: string;

    @ApiProperty()
    @Column()
    fullname: string;

    @ApiProperty()
    @Column()
    password: string;
}
