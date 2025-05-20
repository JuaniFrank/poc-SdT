import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { AreasModule } from './areas/areas.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [EmployeesModule, AreasModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
