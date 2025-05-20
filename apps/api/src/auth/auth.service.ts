import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginCredentialsDto } from './dto/login-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { QueryResult } from 'mysql2';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    loginCredentials: LoginCredentialsDto,
  ): Promise<{ token: string }> {

    const [rows]: any = await this.userService.findOneByEmail(loginCredentials.email);
    const user = rows[0];

    if (!user) throw new NotFoundException('User not found');

    const passwordMatches = await bcrypt.compare(
      loginCredentials.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.email };
    const token = await this.jwtService.signAsync(payload);
    return { token };
  }

  async register(createUserDto: CreateUserDto): Promise<QueryResult> {
    const user = await this.userService.create(createUserDto);
    return user as unknown as QueryResult;
  }
}
