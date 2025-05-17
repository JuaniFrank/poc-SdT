import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent),
    children: [
      {
        path: 'employees',
        loadComponent: () => import('./employees/employees.component').then(m => m.EmployeesComponent),
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
      },
      {
        path: '',
        redirectTo: 'employees',
        pathMatch: 'full',
      },
    ],
  },
];
