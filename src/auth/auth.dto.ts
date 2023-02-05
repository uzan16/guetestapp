import { PickType } from "@nestjs/swagger";
import { CreateEmployeeDto } from "src/employee/dto/create-employee.dto";

export class AuthDto extends PickType(CreateEmployeeDto, ['username', 'password']) {

}