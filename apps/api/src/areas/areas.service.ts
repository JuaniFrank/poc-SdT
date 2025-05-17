import { Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Inject } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

@Injectable()
export class AreasService {

  constructor(@Inject('DATABASE_CONNECTION') private db: Pool) {}

  async create(createAreaDto: CreateAreaDto) {
    const { title } = createAreaDto;
    const [result] = await this.db.execute(
      'INSERT INTO areas (title) VALUES (?)',
      [title],
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
    const { title } = updateAreaDto;
    const [result] = await this.db.execute(
      'UPDATE areas SET title = ? WHERE id = ?',
      [title, id],
    );
    return result;
  }

  async remove(id: number) {
    const [result] = await this.db.execute('DELETE FROM areas WHERE id = ?', [id]);
    return result;
  }
}
