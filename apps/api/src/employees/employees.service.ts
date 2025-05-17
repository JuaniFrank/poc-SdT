import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Inject } from '@nestjs/common';
import { Pool, QueryResult } from 'mysql2/promise';
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

  async createEmployee(employee: CreateEmployeeDto): Promise<QueryResult> {
      const [result] = await this.db.execute(
      `INSERT INTO employees (name, lastName, email, identity_document, birth_date, is_developer, description, area_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        employee.name,
        employee.lastName ?? null,
        employee.email ?? null,
        employee.identityDocument ?? null,
        employee.birthDate ?? null,
        employee.isDeveloper ?? null,
        employee.description ?? null,
        employee.areaId ?? null,
      ]
    );
    return result;
  }


  async findOneEmployee(id: number): Promise<Employee> {
    const [rows] = await this.db.query(`SELECT * FROM employees WHERE id = ?`, [id]);
    return rows[0] as Employee;
  }

  async updateEmployee(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<QueryResult> {
    const fields: string[] = [];
    const values: (string | number | boolean)[] = [];
  
    for (const [key, value] of Object.entries(updateEmployeeDto)) {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }
  
    if (fields.length === 0) {
      throw new Error("No fields provided for update");
    }
  
    const sql = `UPDATE employees SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);
  
    const [result] = await this.db.execute(sql, values);
    return result;
  }

  async softRemoveEmployee(id: number): Promise<QueryResult> {
    const [result] = await this.db.execute(`UPDATE employees SET deleted = true WHERE id = ?`, [id]);
    return result;
  }

  async removeEmployee(id: number): Promise<QueryResult> {
    const [result] = await this.db.execute(`DELETE FROM employees WHERE id = ?`, [id]);
    return result;
  }
}
