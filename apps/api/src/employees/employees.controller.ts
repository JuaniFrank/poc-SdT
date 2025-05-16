import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly appService: EmployeesService) {}

  @Get()
  findAll(): string {
    return this.appService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return this.appService.findOne(+id);
  }

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto): string {
    return this.appService.create(createEmployeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEmployeeDto: UpdateEmployeeDto): string {
    return this.appService.update(+id, updateEmployeeDto);
  } 

  @Delete('/:id')
  remove(@Param('id') id: string): string {
    return this.appService.remove(+id);
  }
}


