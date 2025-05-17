import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: EmployeesComponent
    }]),
  ],
  declarations: [EmployeesComponent],
  exports: [EmployeesComponent],
})
export class EmployeesModule {}
