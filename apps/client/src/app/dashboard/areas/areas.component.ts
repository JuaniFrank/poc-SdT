import { Component, inject, signal} from '@angular/core';
import { AreaTableComponent } from '../shared/area-table/area-table.component';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-areas',
  standalone: true,
  imports: [AreaTableComponent, NgIf],
  templateUrl: './areas.component.html'
})
export class AreasComponent {

  private http = inject(HttpClient);

  loading = signal(true);
  areas = signal<any[]>([]);

  ngOnInit() {
    this.fetchAreas();
  }

  private fetchAreas() {
    this.loading.set(true);

    this.http.get<any[]>('http://localhost:3000/areas').subscribe({
      next: (data) => {
        this.areas.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar areas:', err);
        this.loading.set(false);
      }
    });
  }


}
