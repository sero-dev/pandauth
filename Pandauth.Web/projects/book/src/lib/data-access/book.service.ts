import { HttpClient, HttpResourceRef, httpResource } from '@angular/common/http';
import { Injectable, Signal, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://localhost:7046/api/books';

  public getAll(): HttpResourceRef<BookHttp[] | undefined> {
    return httpResource<BookHttp[]>(this.baseUrl);
  }

  public get(id: Signal<number>): HttpResourceRef<BookHttp | undefined> {
    return httpResource<BookHttp>(() => `${this.baseUrl}/${id()}`);
  }

  public create(title: string, authorName?: string | null, year?: number | null): Observable<BookHttp> {
    const body: CreateBookHttp = { title, authorName, year };
    return this.http.post<BookHttp>(this.baseUrl, body);
  }

  public update(id: number, title: string, authorName?: string | null, year?: number | null): Observable<BookHttp> {
    const url = `${this.baseUrl}/${id}`;
    const body: UpdateBookHttp = { id, title, authorName, year };
    return this.http.put<BookHttp>(url, body);
  }

  public delete(id: number): Observable<BookHttp> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<BookHttp>(url);
  }
}

export interface BookHttp extends Auditable {
  id: number;
  title: string;
  authorName?: string;
  year?: number;
}

export interface CreateBookHttp {
  title: string;
  authorName?: string | null;
  year?: number | null;
}

export interface UpdateBookHttp {
  id: number;
  title: string;
  authorName?: string | null;
  year?: number | null;
}

export interface Auditable {
  createdBy: string;
  created: string;
  lastModifiedBy?: string;
  lastModified?: string;
}
