import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceTsService {

  private baseUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  getAllByStatus(status: 'active' | 'deleted'): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/status/${status}`);
  }

  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/id/${id}`);
  }

  update(id: number, data: Partial<Employee>): Observable<Employee> {
    return this.http.patch<Employee>(`${this.baseUrl}/edit/${id}`, data);
  }

  deleteSoft(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/soft/${id}`);
  }

  deleteHard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/hard/${id}`);
  }

  create(data: Partial<Employee>): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/create`, data);
  }
}
