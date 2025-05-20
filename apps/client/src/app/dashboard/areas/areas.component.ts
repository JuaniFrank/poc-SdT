import { Component, inject, signal} from '@angular/core';
import { AreaTableComponent } from '../shared/area-table/area-table.component';
import { NgIf } from '@angular/common';
import { AreaServiceTsService } from 'src/app/services/area/area.service';
import { ButtonModule } from 'primeng/button';
import { EditDialogComponent } from '../shared/edit-dialog/create-area-dialog.component';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Area } from 'src/app/models/area.model';


@Component({
  selector: 'app-areas',
  standalone: true,
  imports: [AreaTableComponent, NgIf, ButtonModule, MessageModule, DialogModule, DynamicDialogModule],
  templateUrl: './areas.component.html'
})
export class AreasComponent {

  private areaService = inject(AreaServiceTsService);

  ref: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService, public messageService: MessageService) {}

  loading = signal(true);
  areas = signal<any[]>([]);

  show() {
    const header = 'New Area';

    this.ref = this.dialogService.open(EditDialogComponent, {
      header,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });

    this.ref.onClose.subscribe((result: any) => {
      if (result) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Area created successfully' });
        this.fetchAreasWithQuantitys();
      }
    });
  }

  private fetchAreasWithQuantitys() {
    this.loading.set(true);

    this.areaService.getAreasWithQuantitys().subscribe({
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

  public updateAreaColor(area: any) {
    this.areaService.update(area.id, { color: area.color }).subscribe({
      next: () => {
        this.fetchAreasWithQuantitys();
      },
      error: (err) => {
        console.error('Error al actualizar color:', err);
      }
    });
  }

  public editArea(area: any) {
    this.areaService.update(area.id, { title: area.title, color: area.color }).subscribe({
      next: () => {
        this.fetchAreasWithQuantitys();
      },
      error: (err) => {
        console.error('Error al actualizar área:', err);
      }
    });
    this.fetchAreasWithQuantitys();
  }

  public deleteArea(area: any) {
    if (confirm('¿Estás seguro de que deseas eliminar esta área?')) {
      this.areaService.delete(area.id).subscribe({
        next: () => {
          this.fetchAreasWithQuantitys();
        },
        error: (err) => {
          console.error('Error al eliminar área:', err);
        }
      });
    }
    this.fetchAreasWithQuantitys();
  }

  ngOnInit() {
    this.fetchAreasWithQuantitys();
  }
}
