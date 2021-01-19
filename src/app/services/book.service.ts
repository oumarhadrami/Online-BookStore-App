import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../common/book';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'http://localhost:8080/api/v1/books';

  constructor(private httpClient: HttpClient) {}

  getBooks(currentCategoryId : number): Observable<Book[]> {
    const searchUrl = `${this.baseUrl}/search/category_id?id=${currentCategoryId}`;

    return this.httpClient
      .get<ResponeBooks>(searchUrl)
      .pipe(map((response) => response._embedded.books));
  }
}

interface ResponeBooks {
  _embedded: {
    books: Book[];
  };
}
