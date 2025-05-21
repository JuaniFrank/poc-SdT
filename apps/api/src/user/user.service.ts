import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bycrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Pool, QueryResult } from 'mysql2';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@Inject('DATABASE_CONNECTION') private readonly db: Pool) {}

  async create(createUserDto: CreateUserDto) {
    const emailExistsResult = await this.db.execute(
      'SELECT * FROM users WHERE email = ?',
      [createUserDto.email],
    );
    const [emailExists] = emailExistsResult[0];

    if (emailExists) throw new ConflictException('Email already exists');

    const hashedPassword = await bycrypt.hash(createUserDto.password, 14);

    const newUser = {
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
    };

    const result = await this.db.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [newUser.username, newUser.email, newUser.password],
    );

    const [rows]: any = await this.db.execute(
      'SELECT * FROM users WHERE email = ?',
      [createUserDto.email],
    );
    const user = rows[0];

    return user;
  }

  async findAll(): Promise<User[]> {
    const rows = await this.db.execute('SELECT * FROM users');
    return rows as unknown as User[];
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    const updatedUser = {
      username: updateUserDto.username,
      password: bycrypt.hashSync(updateUserDto.password, 14),
      email: updateUserDto.email,
    };

    const result = await this.db.execute('UPDATE users SET ? WHERE id = ?', [
      updatedUser,
      id,
    ]);
    return result;
  }

  async findOne(id: string) {
    const user = await this.db.execute('SELECT * FROM users WHERE id = ?', [
      id,
    ]);

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async delete(id: string) {
    return await this.db.execute('DELETE FROM users WHERE id = ?', [id]);
  }

  async findOneByEmail(email: string) {
    const user = await this.db.execute('SELECT * FROM users WHERE email = ?', [
      email,
    ]);

    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
