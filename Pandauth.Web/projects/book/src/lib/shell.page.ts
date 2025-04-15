import { Component, computed, inject, model } from '@angular/core';
import { BookService } from './data-access/book.service';
import { FormsModule } from '@angular/forms';
import { BookListComponent } from './ui/book-list/book-list.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonDirective, InputDirective } from 'common';

@Component({
  selector: 'book-shell',
  imports: [InputDirective, FormsModule, ButtonDirective, BookListComponent, RouterOutlet, RouterLink],
  template: `
    @let books = filterBooks();
    <div class="h-screen flex gap-2 p-2">
      <div class="w-96 rounded-md h-full flex flex-col gap-2">
        <input commonInput [(ngModel)]="searchText" type="text" placeholder="Search by book title..." />
        <book-book-list [books]="books" (select)="onBookSelected($event)" />
        <button commonButton icon="plus" routerLink="create">Create a new book</button>
      </div>
      <div class="grow h-full">
        <router-outlet />
      </div>
    </div>
  `,
})
export class ShellPage {
  private readonly router = inject(Router);

  protected readonly books = inject(BookService).getAll();
  protected readonly searchText = model<string>('');

  public refresh() {
    this.books.reload();
  }

  protected readonly filterBooks = computed(() => {
    const books = this.books.value();
    const searchText = this.searchText();

    if (!books) return;
    if (!searchText) return books;

    return books.filter(b => b.title.toLowerCase().includes(searchText.toLowerCase()));
  });

  protected onBookSelected(id: number) {
    this.router.navigate(['/books', id]);
  }
}
