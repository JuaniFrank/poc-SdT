import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
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
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

interface DialogData {
  data: Employee | undefined;
}

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
    DropdownModule,
    CommonModule,
    DatePickerModule,
    ToggleSwitchModule
  ],
  providers: [DialogService, MessageService],
})
export class EditEmployeeComponent {
  private employeeService = inject(EmployeeServiceTsService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private ref = inject(DynamicDialogRef<any>);
  private employee?: Employee;
  private config = inject(DynamicDialogConfig);

  private areaService = inject(AreaServiceTsService);

  areas = signal<Area[]>([]);
  employeeForm!: FormGroup;

  isEdit = signal(false);

  constructor() {
    this.isEdit.set(this.config.data?.id !== undefined);
    this.employee = this.config.data as Employee;
    this.employeeForm = this.buildForm();
    console.log(this.config.data)
  }

  private loadAreas() {
    this.areaService.getAll().subscribe((areas) => {
      this.areas.set(areas);
    });
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      id: [this.employee?.id || null],
      name: [
        this.employee?.name || '',
        [Validators.required, Validators.minLength(3)],
      ],
      lastname: [
        this.employee?.lastname || '',
        [Validators.required, Validators.minLength(3)],
      ],
      email: [
        this.employee?.email || '',
        [Validators.required, Validators.email],
      ],
      area_id: [this.employee?.area_id || null, Validators.required],
      identity_document: [
        this.employee?.identity_document || '',
        [Validators.required],
      ],
      birth_date: [this.employee?.birth_date ? new Date(this.employee.birth_date) : null, [Validators.required]],
      is_developer: [this.employee?.is_developer ? true : false, [Validators.required]],
      description: [this.employee?.description || '', [Validators.required]],
    });
  }

  updateEmployee(employee: Employee | Partial<Employee>): void {
    console.log(employee)
    if (this.isEdit()) {
      if (employee.birth_date) {
        employee.birth_date = new Date(employee.birth_date).toISOString().split('T')[0];
      }
      
      this.employeeService.update(employee.id!, employee).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Empleado actualizado exitosamente',
          });
          this.ref.close(employee);
        },
        error: (err) => {
          console.error('Error al actualizar empleado:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar el empleado',
          });
        },
      });
    } else {
      if (employee.birth_date) {
        employee.birth_date = new Date(employee.birth_date).toISOString().split('T')[0];
      }
      
      this.employeeService.create(employee).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Empleado creado exitosamente',
          });
          this.ref.close(employee);
        },
        error: (err) => {
          console.error('Error al crear empleado:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear el empleado',
          });
        },
      });
    }
  }

ngOnInit() {
  this.loadAreas();
}

  close(): void {
    this.ref.close();
  }
}
