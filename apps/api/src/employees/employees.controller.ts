import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { QueryResult } from 'mysql2';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly appService: EmployeesService) {}

  @Get()
  findAll(): Promise<Employee[]> {
    return this.appService.findAllEmployees();
  }

  // @Get(':id')
  // findOneEmployee(@Param('id') id: number): Promise<Employee> {
  //   return this.appService.findOneEmployee(+id);
  // }

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<QueryResult> {
    return this.appService.createEmployee(createEmployeeDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateEmployeeDto: UpdateEmployeeDto): string {
  //   return this.appService.updateEmployee(+id, updateEmployeeDto);
  // } 

  // @Delete('/:id')
  // remove(@Param('id') id: string): string {
  //   return this.appService.removeEmployee(+id);
  // }
}


