import { Component, inject, input, numberAttribute, signal } from '@angular/core';
import { BookService } from '../../data-access/book.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ShellPage } from '../../shell.page';
import { DatePipe } from '@angular/common';
import { ButtonDirective } from 'common';

@Component({
  selector: 'book-book-detail',
  imports: [ButtonDirective, RouterLink, DatePipe],
  template: `
    <div
      class="bg-white rounded-md px-4 h-full flex flex-col justify-center items-center border border-neutral-300 dark:bg-neutral-900 dark:border-neutral-700"
    >
      <div class="flex flex-col max-w-2xl w-full">
        @if (resource.value(); as book) {
        <span class="font-semibold text-3xl">
          {{ book.title }}
          @if (book.year) { ({{ book.year }}) }
        </span>
        <span>
          {{ book.authorName }}
        </span>
        <div class="mt-5 flex gap-2 items-center">
          @if (showDeleteConfirmation()) {
          <span>Are you sure?</span>
          <button
            commonButton
            color="black"
            icon="x"
            variant="soft"
            size="sm"
            (click)="showDeleteConfirmation.set(false)"
          >
            Cancel
          </button>
          <button commonButton color="red" icon="trash" variant="soft" size="sm" (click)="onDeleteConfirmed()">
            Delete
          </button>

          } @else {
          <button routerLink="edit" commonButton color="purple" icon="pencil" variant="soft" size="sm">Update</button>
          <button commonButton color="red" icon="trash" variant="soft" size="sm" (click)="onDeleteClick()">
            Delete
          </button>
          }
        </div>
        <div class="flex flex-col text-sm mt-5">
          <div class="flex">
            <span class="grow shrink basis-10">Created By:</span>
            <span>{{ book.createdBy }}</span>
          </div>
          <div class="flex">
            <span class="grow shrink basis-10">Created On:</span>
            <span>{{ book.created | date : 'medium' }}</span>
          </div>
          <div class="flex">
            <span class="grow shrink basis-10">Last Modified By:</span>
            <span>{{ book.lastModifiedBy }}</span>
          </div>
          <div class="flex">
            <span class="grow shrink basis-10">Last Modified On:</span>
            <span>{{ book.lastModified | date : 'medium' }}</span>
          </div>
        </div>
        }
      </div>
    </div>
  `,
})
export class BookDetailComponent {
  public readonly id = input.required<number, string>({
    transform: numberAttribute,
  });

  private readonly bookService = inject(BookService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly page = inject(ShellPage);

  protected readonly resource = this.bookService.get(this.id);
  protected readonly showDeleteConfirmation = signal<boolean>(false);

  protected onDeleteClick() {
    this.showDeleteConfirmation.set(true);
  }

  protected onDeleteConfirmed() {
    const id = this.id();

    if (id === undefined) return;

    this.bookService.delete(id).subscribe(() => {
      this.page.refresh();
      this.navigateBack();
    });
  }

  protected navigateBack(): void {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
