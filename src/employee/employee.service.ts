import { ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import * as md5 from "md5";
import { PaginatedDto } from './dto/paginated.dto';

@Injectable()
export class EmployeeService {
  constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>) {

  }
  async create(createEmployeeDto: CreateEmployeeDto) {
    let obj = await this.findBy({
      username: createEmployeeDto.username
    });
    if (!!obj) throw new ConflictException({message: "Username already exists"});
    
    const newData = this.employeeRepository.create({
      ...createEmployeeDto,
      password: md5(createEmployeeDto.password)
    })
    return this.employeeRepository.save(newData);
  }

  async findAll(take: number, page: number) {
    if (!page) {
      page = 1;
    }
    const skip = (page - 1) * take;
    const [data, total] = await this.employeeRepository.findAndCount({
      skip,
      take
    })
    const totalPage = Math.ceil(total/take);
    const startAt = Math.max(0, page - 3);
    let paginations: number[] = [];
    for (let i = 1; i <= 5 && i + startAt <= totalPage; i++) {
      paginations.push(startAt + i);
    }
    let i = 0;
    while (paginations.length < 5) {
      if (startAt - i > 0) {
        paginations.unshift(startAt - i);
        i++;
      } else {
        break;
      }
    }
    const result: PaginatedDto<Employee> = {
      data,
      total,
      take,
      page,
      paginations: paginations.map(x => ({page: x, active: x == page})),
      totalPage
    };
    return result;
  }

  findOne(id: number) {
    return this.employeeRepository.findOneBy({id});
  }

  findBy({username, fullname}: UpdateEmployeeDto) {
    return this.employeeRepository.findOneBy({
      username,
      fullname
    });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    if (updateEmployeeDto.username) {
      let obj = await this.employeeRepository.findOneBy({
        username: updateEmployeeDto.username,
        id: Not(id)
      });
      if (!!obj) throw new ConflictException({message: "Username already exists"});
    }
    let password;
    if (updateEmployeeDto.password) {
      password = md5(updateEmployeeDto.password);
    }
    let obj = await this.findOne(id);
    if (!obj) throw new NotFoundException({message: "Employee not found"});
    return this.employeeRepository.save({
      ...obj,
      ...updateEmployeeDto,
      password
    });
  }

  async remove(id: number) {
    let obj = await this.findOne(id);
    if (!obj) throw new NotFoundException({message: "Employee not found"});
    return this.employeeRepository.remove(obj);
  }
}
