import { Component, input } from '@angular/core';
import { BookHttp } from '../../data-access/book.service';

@Component({
  selector: 'book-book-list-item',
  template: `
    @let item = book();
    <div
      class="p-3 flex flex-col border-b border-neutral-300 dark:border-neutral-800 hover:cursor-pointer hover:bg-blue-50 dark:hover:bg-neutral-800"
    >
      <div class="flex justify-between">
        <span class="font-semibold">{{ item.title }}</span>
        <span>{{ item.year }}</span>
      </div>
      <span class="text-sm">{{ item.authorName }}</span>
    </div>
  `,
})
export class BookListItemComponent {
  public readonly book = input.required<BookHttp>();
}
