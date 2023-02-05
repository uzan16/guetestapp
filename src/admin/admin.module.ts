import { Module } from '@nestjs/common';
import { EmployeeModule } from 'src/employee/employee.module';
import { AdminController } from './admin.controller';

@Module({
  controllers: [AdminController],
  imports: [
    EmployeeModule
  ],
})
export class AdminModule {}
