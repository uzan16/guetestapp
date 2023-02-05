import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EmployeeService } from "src/employee/employee.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private employeeService: EmployeeService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_KEY
        });
    }

    async validate(payload: any) {
        const emp = await this.employeeService.findOne(payload.id);
        if (emp)
            return emp;
        throw new UnauthorizedException();
    }
}