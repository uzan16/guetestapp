import {IsNotEmpty, IsString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEmployeeDto {
    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsString()
    fullname: string;

    @ApiProperty({required: true})
    @IsString()
    password: string;
}
