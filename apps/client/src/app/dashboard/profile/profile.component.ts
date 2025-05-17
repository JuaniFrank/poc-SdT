import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-profile',
  template: `
    <h2>Profile Screen</h2>
    <p>This is the profile section.</p>
  `,
})
export class ProfileComponent {}
