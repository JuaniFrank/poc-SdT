import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { AreasModule } from './areas/areas.module';

@Module({
  imports: [EmployeesModule, AreasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
