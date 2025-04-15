import { Route } from '@angular/router';
import { ShellPage } from './shell.page';

export const BookRoutes: Route[] = [
  {
    path: '',
    component: ShellPage,
    children: [
      {
        path: 'create',
        loadComponent: () => import('./feature/create-book/create-book.component').then(m => m.CreateBookComponent),
        title: 'Create Book',
      },
      {
        path: ':id',
        loadComponent: () => import('./feature/book-detail/book-detail.component').then(m => m.BookDetailComponent),
        pathMatch: 'full',
        title: 'Book Detail',
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./feature/edit-book/edit-book.component').then(m => m.EditBookComponent),
        title: 'Edit Book',
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
