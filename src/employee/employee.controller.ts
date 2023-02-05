import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';
import { PaginatedDto } from './dto/paginated.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@ApiTags("Employee")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('api/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiCreatedResponse({
    description: "Created employee object as response",
    type: Employee
  })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  @ApiOkResponse({
    type: PaginatedDto<Employee>
  })
  findAll(@Query('take') take?: number, @Query('page') page?: number) {
    if (take === undefined) {
      take = 10;
    }
    if (page === undefined) {
      page = 1;
    }
    return this.employeeService.findAll(+take, +page);
  }

  @Get(':id')
  @ApiOkResponse({
    type: Employee
  })
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: "Updated employee object as response",
    type: Employee
  })
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: "Deleted employee object as response",
    type: Employee
  })
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
