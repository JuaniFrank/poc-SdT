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

  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }

  update(id: number, data: Partial<Employee>): Observable<Employee> {
    console.log({id, data});
    return this.http.patch<Employee>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  create(data: Partial<Employee>): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, data);
  }
}
