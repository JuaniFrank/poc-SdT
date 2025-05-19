import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Employee } from 'src/app/models/employee.model';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {
  private http = inject(HttpClient);

  loading = signal(true);
  employees = signal<Employee[]>([]);

  ngOnInit() {
    this.fetchEmployees();
  }

  private fetchEmployees() {
    this.loading.set(true);

    this.http.get<Employee[]>('http://localhost:3000/employees').subscribe({
      next: (data) => {
        this.employees.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar empleados:', err);
        this.loading.set(false);
      }
    });
  }
}
