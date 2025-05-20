import { Component, OnInit, signal, computed, inject } from '@angular/core';
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
import { map } from 'rxjs/operators';
import { Area, AreaIn } from 'src/app/models/area.model';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, MessageModule, ChipModule, AreaPillComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {
  private http = inject(HttpClient);
  private areaService = inject(AreaServiceTsService);
  
  loading = signal(true);
  employees = signal<Employee[]>([]);
  areas = signal<Area[]>([]);

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
    this.http.get<Employee[]>('http://localhost:3000/employees').subscribe({
      next: (employees) => {
        this.employees.set(employees);
        console.log(this.employees());
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
        this.loading.set(false);
      }
    });
  }

  deleteEmployee(employeeId: number) {
    this.loading.set(true);
    this.http.delete(`http://localhost:3000/employees/soft/${employeeId}`).subscribe({
      next: () => {
        this.fetchEmployees();
      },
      error: (error) => {
        console.error('Error deleting employee:', error);
        this.loading.set(false);
      }
    });
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
}
