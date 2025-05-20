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
import { Employee } from 'src/app/models/employee.model';
import { EmployeeServiceTsService } from 'src/app/services/employee/employee.service.ts.service';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';


@Component({
    standalone: true,
    templateUrl: './edit-employee.component.html',
    imports: [
      MessageModule,
      ColorPickerModule,
      ReactiveFormsModule,
      FormsModule,
      InputTextModule,
      ButtonModule,
      DropdownModule
    ],
    providers: [DialogService, MessageService]
})
export class EditEmployeeComponent {
    
    private employeeService = inject(EmployeeServiceTsService);
    private fb = inject(FormBuilder);
    private messageService = inject(MessageService);
    private ref = inject(DynamicDialogRef);
    private areaService = inject(AreaServiceTsService);

    areas = signal<Area[]>([]);
    employeeForm!: FormGroup;

    constructor() {
      this.employeeForm = this.buildForm();
      this.loadAreas();
    }

    private loadAreas() {
      this.areaService.getAll().subscribe(areas => {
        this.areas.set(areas);
      });
    }

    private buildForm(): FormGroup {
      return this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        lastname: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
        address: ['', [Validators.required]],
        area_id: [null, Validators.required],
        identity_document: ['', [Validators.required]],
        birth_date: ['', [Validators.required]],
        is_developer: ['', [Validators.required]],
        description: ['', [Validators.required]]
      });
    }

    addEmployee(employee: Employee): void {
      this.employeeService.create(employee).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Empleado creado exitosamente'
          });
          this.ref.close(employee);
        },
        error: (err) => {
          console.error('Error al crear empleado:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear el empleado'
          });
        }
      });
    }

    close(): void {
      this.ref.close();
    }
}