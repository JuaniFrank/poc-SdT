import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { AreasModule } from './areas/areas.module';

@Module({
  imports: [EmployeesModule, AreasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
