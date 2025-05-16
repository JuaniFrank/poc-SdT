import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Inject } from '@nestjs/common';
import { Pool } from 'mysql2/promise';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {

  constructor(
    @Inject('DATABASE_CONNECTION') private readonly db: Pool,
  ) {}

  async findAllEmployees(): Promise<Employee[]> {
    const [rows] = await this.db.query(`SELECT * FROM employees`);
    return rows as Employee[];
  }

  async createEmployee(employee: CreateEmployeeDto) {
    const [result] = await this.db.execute(
      `INSERT INTO employees (name, lastName, email, identityDocument, birthDate, isDeveloper, description, areaId, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [employee.name, employee.lastName, employee.email, employee.identityDocument, employee.birthDate, employee.isDeveloper, employee.description, employee.areaId, employee.deleted],
    ) as unknown as [Employee];
    return result;
  }

  async findOneEmployee(id: number) {
    const [rows] = await this.db.query(`SELECT * FROM employees WHERE id = ?`, [id]);
    return rows;
  }

  async updateEmployee(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const [result] = await this.db.execute(
      `UPDATE employees SET name = ?, lastName = ?, email = ?, identityDocument = ?, birthDate = ?, isDeveloper = ?, description = ?, areaId = ?, deleted = ? WHERE id = ?`,
      [updateEmployeeDto.name, updateEmployeeDto.lastName, updateEmployeeDto.email, updateEmployeeDto.identityDocument, updateEmployeeDto.birthDate, updateEmployeeDto.isDeveloper, updateEmployeeDto.description, updateEmployeeDto.areaId, updateEmployeeDto.deleted, id],
    );
    return result;
  }

  async removeEmployee(id: number) {
    const [result] = await this.db.execute(`DELETE FROM employees WHERE id = ?`, [id]);
    return result;
  }
}
