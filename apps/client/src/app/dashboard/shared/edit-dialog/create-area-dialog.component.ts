import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageModule } from 'primeng/message';
import { AreaServiceTsService } from 'src/app/services/area/area.service';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Area } from 'src/app/models/area.model';

@Component({
    standalone: true,
    templateUrl: './create-area-dialog.component.html',
    imports: [
      MessageModule,
      ColorPickerModule,
      ReactiveFormsModule,
      InputTextModule,
      ButtonModule
    ],
    providers: [DialogService, MessageService]
})
export class EditDialogComponent {
    
    private areaService = inject(AreaServiceTsService);
    private fb = inject(FormBuilder);
    private messageService = inject(MessageService);
    private ref = inject(DynamicDialogRef);

    areaForm: FormGroup;

    constructor() {
        this.areaForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            color: [null, Validators.required]
          });
    }

    addArea(area: Area) {
        this.areaService.create(area).subscribe({
          next: () => {
            this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Área creada exitosamente'
            });
            this.ref.close(area);
          },
          error: (err) => {
            console.error('Error al crear área:', err);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo crear el área'
            });
          }
        });
    }

  close() {
      this.ref.close();
  }
}