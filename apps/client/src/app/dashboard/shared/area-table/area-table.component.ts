import { Component, inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-area-table',
  standalone: true,
  imports: [TableModule, ColorPickerModule, FormsModule, ButtonModule],
  templateUrl: './area-table.component.html',
})
export class AreaTableComponent {
  @Input() areas: any[] = [];

  private http = inject(HttpClient);

  onColorChange(area: any) {
    if (area.id) {
      this.http.patch(`http://localhost:3000/areas/${area.id}`, { color: area.color })
        .subscribe({
          next: () => {
            console.log('Color updated successfully');
          },
          error: (err) => {
            console.error('Error updating color:', err);
            // Revert the color change if update fails
            this.http.get<any>(`http://localhost:3000/areas/${area.id}`).subscribe({
              next: (originalArea) => {
                area.color = originalArea.color;
              }
            });
          }
        });
    }
  }
}
