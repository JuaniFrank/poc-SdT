import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  private router = inject(Router);

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
