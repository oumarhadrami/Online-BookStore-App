import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../common/book';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'http://localhost:8080/api/v1/books?page=0&size=40';

  constructor(private httpClient: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.httpClient
      .get<ResponeBooks>(this.baseUrl)
      .pipe(map((response) => response._embedded.books));
  }
}

interface ResponeBooks {
  _embedded: {
    books: Book[];
  };
}
