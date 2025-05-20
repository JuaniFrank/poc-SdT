import { PartialType } from '@nestjs/mapped-types';
import { LoginCredentialsDto } from './login-auth.dto';

export class UpdateAuthDto extends PartialType(LoginCredentialsDto) {}