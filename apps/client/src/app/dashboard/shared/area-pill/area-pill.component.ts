import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-area-pill',
  imports: [],
  templateUrl: './area-pill.component.html'
})
export class AreaPillComponent {
  @Input() title!: string;
  @Input() color!: string;

}
