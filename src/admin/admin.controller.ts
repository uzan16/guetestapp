import { Body, Controller, Get, Param, Post, Query, Redirect, Render } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';
import { UpdateEmployeeDto } from 'src/employee/dto/update-employee.dto';
import { EmployeeService } from 'src/employee/employee.service';

@ApiExcludeController()
@Controller('admin')
export class AdminController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @Render('pages/index')
  async index(@Query('take') take?: number, @Query('page') page?: number) {
    if (take === undefined) {
      take = 10;
    }
    if (page === undefined) {
      page = 1;
    }
    return await this.employeeService.findAll(take, page);
  }

  @Get('add')
  @Render('pages/form')
  async addForm() {
    return {};
  }

  @Get('edit')
  @Render('pages/form')
  async editForm(@Query('id') id: number) {
    const obj = await this.employeeService.findOne(id);;
    return {
      data: obj,
      isEdit: true
    };
  }

  @Post('create')
  @Redirect('/admin')
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Post('update/:id')
  @Redirect('/admin')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Get('remove')
  @Redirect('/admin')
  remove(@Query('id') id: number) {
    return this.employeeService.remove(+id);
  }
}
