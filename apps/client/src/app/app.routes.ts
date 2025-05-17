import { Routes } from '@angular/router';
import { DASHBOARD_ROUTES } from './dashboard/dashboard.routes';

export const routes: Routes = [
  {
    path: 'dashboard',
    children: DASHBOARD_ROUTES,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
