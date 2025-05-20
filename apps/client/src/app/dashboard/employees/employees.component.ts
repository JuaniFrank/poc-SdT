import { Component, OnInit, signal, computed, inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Employee } from 'src/app/models/employee.model';
import { MessageModule } from 'primeng/message';
import { ChipModule } from 'primeng/chip';
import { AreaServiceTsService } from 'src/app/services/area/area.service';
import { AreaPillComponent } from '../shared/area-pill/area-pill.component';
import { Area, AreaIn } from 'src/app/models/area.model';
import { EmployeeServiceTsService } from 'src/app/services/employee/employee.service.ts.service';
import { SelectModule } from 'primeng/select';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { EditEmployeeComponent } from '../shared/edit-employee/edit-employee.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, MessageModule, ChipModule, AreaPillComponent, SelectModule, DropdownModule, FormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {

  ref: DynamicDialogRef | undefined;

  private dialogService = inject(DialogService);
  private messageService = inject(MessageService);

  private http = inject(HttpClient);
  private areaService = inject(AreaServiceTsService);
  private employeeService = inject(EmployeeServiceTsService);
  
  loading = signal(true);
  employees = signal<Employee[]>([]);
  areas = signal<Area[]>([]);

  selectedStatus = signal<'active' | 'deleted' | 'all'>('active');

  statusOptions = [
    { label: 'Todos', value: 'all' },
    { label: 'Activos', value: 'active' },
    { label: 'Eliminados', value: 'deleted' }
  ];

  ngOnInit() {
    this.areaService.getAll().subscribe(areas => {
      this.areas.set(areas);
      this.loading.set(false);
    });
    this.fetchEmployees();
  }


  fetchEmployees() {
    this.loading.set(true);
    if (this.selectedStatus() === 'all') {
      this.employeeService.getAll().subscribe({
        next: (employees) => {
          this.employees.set(employees);
          this.loading.set(false);
        },
        error: (error) => {
          console.error('Error fetching employees:', error);
          this.loading.set(false);
        }
      });
    } else {
      this.employeeService.getAllByStatus(this.selectedStatus() as 'active' | 'deleted').subscribe({
        next: (employees) => {
          this.employees.set(employees);
          this.loading.set(false);
        },
        error: (error) => {
          console.error('Error fetching employees:', error);
          this.loading.set(false);
        }
      });
    }
  }



  deleteEmployee(employeeId: number, type: 'soft' | 'hard') {
    this.loading.set(true);
    if (type === 'soft') {
      this.employeeService.deleteSoft(employeeId).subscribe({
        next: () => {
          this.fetchEmployees();
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
          this.loading.set(false);
        }
      });
    } else {
      this.employeeService.deleteHard(employeeId).subscribe({
        next: () => {
          this.fetchEmployees();
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
          this.loading.set(false);
        }
      });
    }
  }

  getArea(area_id: number | string): AreaIn {
    if (area_id === null || area_id === undefined) return { id: 0, title: '', color: '' };
  
    const area = this.areas().find(a => a.id === +area_id);
    return {
      id: area?.id || 0,
      title: area?.title || '',
      color: area?.color || ''
    };
  }

  onStatusChange() {
    this.fetchEmployees();
  }

    show() {
      const header = 'New Employee';
  
      this.ref = this.dialogService.open(EditEmployeeComponent, {
        header,
        width: '60%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
      });
  
      this.ref.onClose.subscribe((result: any) => {
        if (result) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee created successfully' });
          this.fetchEmployees();
        }
      });
    }

}
