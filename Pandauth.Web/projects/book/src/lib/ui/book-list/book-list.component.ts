import { Component, input, output } from '@angular/core';
import { BookHttp } from '../../data-access/book.service';
import { BookListItemComponent } from '../book-list-item/book-list-item.component';

@Component({
  selector: 'book-book-list',
  imports: [BookListItemComponent],
  template: `
    @if (books(); as books) { @for (book of books; track $index) {
    <book-book-list-item [book]="book" (click)="select.emit(book.id)" />
    } @empty {
    <div class="mt-5 text-center text-sm">No books found</div>
    } } @else {
    <div>Loading...</div>
    }
  `,
  styles: `
    :host {
      display: flex;
      height: 100%;
      flex-direction: column;
      flex-grow: 1;
      overflow-y: auto;
      border-radius: 0.375rem;
      background-color: var(--color-white);
      border-color: var(--color-neutral-300);
      border-style: var(--tw-border-style);
      border-width: 1px;

      &:where(.dark, .dark *) {
        background-color: var(--color-neutral-900);
        border-color: var(--color-neutral-700);
      }
    }
  `,
})
export class BookListComponent {
  public readonly books = input.required<BookHttp[] | undefined>();
  public readonly select = output<number>();
}
