import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
    title: 'Login',
  },
  {
    path: 'books',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('book').then(m => m.BookRoutes),
    title: 'Books',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
