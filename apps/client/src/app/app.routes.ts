import { Routes } from '@angular/router';
import { DASHBOARD_ROUTES } from './dashboard/dashboard.routes';
import { AUTH_ROUTES } from './auth/auth.routes';

export const routes: Routes = [
  {
    path: 'dashboard',
    children: DASHBOARD_ROUTES,
  },
  {
    path: 'auth',
    children: AUTH_ROUTES,
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
