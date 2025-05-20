import { Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Inject } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

@Injectable()
export class AreasService {

  constructor(@Inject('DATABASE_CONNECTION') private db: Pool) {}

  async create(createAreaDto: CreateAreaDto) {
    const { title, color } = createAreaDto;
    const [result] = await this.db.execute(
      'INSERT INTO areas (title, color) VALUES (?, ?)',
      [title, color],
    );
    return result;
  }

  async findAll() {
    const [rows] = await this.db.execute('SELECT * FROM areas');
    return rows;
  }

  async findOne(id: number) {
    const [rows] = await this.db.execute('SELECT * FROM areas WHERE id = ?', [id]);
    return rows[0];
  }

  async update(id: number, updateAreaDto: UpdateAreaDto) {
    const fields = [];
    const values = [];
  
    if (updateAreaDto.title !== undefined) {
      fields.push('title = ?');
      values.push(updateAreaDto.title);
    }
  
    if (updateAreaDto.color !== undefined) {
      fields.push('color = ?');
      values.push(updateAreaDto.color);
    }
  
    if (fields.length === 0) {
      throw new Error('No fields to update');
    }
  
    values.push(id);
    const query = `UPDATE areas SET ${fields.join(', ')} WHERE id = ?`;
  
    const [result] = await this.db.execute(query, values);
    return result;
  }
  
  

  async remove(id: number) {
    const [result] = await this.db.execute('DELETE FROM areas WHERE id = ?', [id]);
    return result;
  }

  async getAreasWithQuantitys() {
    const [rows] = await this.db.query(`
      SELECT 
        a.id,
        a.title,
        a.color,
        COUNT(e.id) AS quantity
      FROM areas a
      LEFT JOIN employees e ON a.id = e.area_id
      GROUP BY a.id, a.title, a.color
    `);
    return rows;
  }
}