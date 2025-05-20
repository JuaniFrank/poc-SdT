import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-area-table',
  standalone: true,
  imports: [TableModule, ColorPickerModule, FormsModule, ButtonModule, NgIf],
  templateUrl: './area-table.component.html',
})
export class AreaTableComponent {
  @Input() areas: any[] = [];
  @Output() updateColor = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  editing = signal(false);
  id = signal(0);
  originalTitle = signal('');
  originalColor = signal('');

  updateTitle(area: any) {
    this.edit.emit(area);
  }


  setEditing(value: boolean, id: number) {
    if (value) {
      const area = this.areas.find(a => a.id === id);
      if (area) {
        this.originalTitle.set(area.title);
        this.originalColor.set(area.color);
      }
    } else {
      const area = this.areas.find(a => a.id === id);
      if (area) {
        area.title = this.originalTitle();
        area.color = this.originalColor();
      }
    }
    this.editing.set(value);
    this.id.set(id);
  }

  editArea(area: any) {
    this.edit.emit(area);
  }

  deleteArea(area: any) {
    this.delete.emit(area);
  }
}