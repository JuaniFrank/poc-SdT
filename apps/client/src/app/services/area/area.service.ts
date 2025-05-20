import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Area } from 'src/app/models/area.model';
import { AreaQ } from 'src/app/models/area.model';


@Injectable({
  providedIn: 'root'
})
export class AreaServiceTsService {

  private baseUrl = 'http://localhost:3000/areas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Area[]> {
    return this.http.get<Area[]>(this.baseUrl);
  }

  getById(id: number): Observable<Area> {
    return this.http.get<Area>(`${this.baseUrl}/${id}`);
  }

  update(id: number, data: Partial<Area>): Observable<Area> {
    console.log({id, data});
    return this.http.patch<Area>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  create(data: Partial<Area>): Observable<Area> {
    return this.http.post<Area>(this.baseUrl, data);
  }

  getAreasWithQuantitys(): Observable<Area[]> {
    return this.http.get<any[]>(`${this.baseUrl}/quantity`).pipe(
      map((response: any[]) => {
        return response.map(area => new AreaQ({
          id: area.id,
          title: area.title,
          color: area.color,
          quantity: area.quantity
        }));
      })
    );
  }
}
