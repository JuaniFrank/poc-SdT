import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { QueryResult } from 'mysql2';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Get()
  findAll(): Promise<Employee[]> {
    return this.employeeService.findAllEmployees();
  }

  @Get('status/:status')
  findAllByStatus(@Param('status') status: 'active' | 'deleted'): Promise<Employee[]> {
    if (status === 'active') {
      return this.employeeService.findAllEmployeesActive();
    } else if (status === 'deleted') {

      return this.employeeService.findAllEmployeesDeleted();
    } else {
      return this.employeeService.findAllEmployees();
    }
  }

  @Get('id/:id')
  findOneEmployee(@Param('id') id: number){
    return this.employeeService.findOneEmployee(+id);
  }

  @Post('/create')
  create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<QueryResult> {
    return this.employeeService.createEmployee(createEmployeeDto);
  }

  @Patch('/edit/:id')
  update(@Param('id') id: number, @Body() updateEmployeeDto: UpdateEmployeeDto): Promise<QueryResult> {
    return this.employeeService.updateEmployee(+id, updateEmployeeDto);
  } 

  @Delete('/hard/:id')
  remove(@Param('id') id: string): Promise<QueryResult> {
    return this.employeeService.removeEmployee(+id);
  }

  @Delete('/soft/:id')
  softRemove(@Param('id') id: string): Promise<QueryResult> {
    return this.employeeService.softRemoveEmployee(+id);
  }
}


