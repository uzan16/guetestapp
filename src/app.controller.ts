import { Body, Controller, Get, Param, Patch, Post, Query, Redirect, Render } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CreateEmployeeDto } from './employee/dto/create-employee.dto';
import { UpdateEmployeeDto } from './employee/dto/update-employee.dto';
import { EmployeeService } from './employee/employee.service';

@ApiExcludeController()   
@Controller()
export class AppController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @Redirect('/admin')
  index() {
    return {};
  }
}
