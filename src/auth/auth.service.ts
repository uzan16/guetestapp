import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from 'src/employee/employee.service';
import * as md5 from "md5";

@Injectable()
export class AuthService {
    constructor(private employeeService: EmployeeService, private jwtService: JwtService) {}
    async auth(username: string, password: string) {
        const emp = await this.employeeService.findBy({username});
        if (!emp)
            throw new NotFoundException({message: "Employee not found"});
        if (emp.password !== md5(password))
            throw new BadRequestException({message: 'Wrong password!'});
        return emp;
    }
    
    async generateToken(id: number) {
        let token = this.jwtService.sign({id});
        return {
            token
        };
    }
}
