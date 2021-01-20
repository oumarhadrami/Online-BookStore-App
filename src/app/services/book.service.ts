import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../common/book';
import { map } from 'rxjs/operators';
import { BookCategory } from '../common/book-category';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'http://localhost:8080/api/v1/books';
  private categoryUrl = 'http://localhost:8080/api/v1/book-category';

  constructor(private httpClient: HttpClient) {}

  getBooks(currentCategoryId: number): Observable<Book[]> {
    const searchUrl = `${this.baseUrl}/search/category_id?id=${currentCategoryId}`;
    return this.fetchBooksList(searchUrl);
  }

  getBook(bookId: number): Observable<Book> {
    const bookDetailsUrl = `${this.baseUrl}/${bookId}`;
    return this.httpClient.get<Book>(bookDetailsUrl);
  }

  getBookCategories(): Observable<BookCategory[]> {
    return this.httpClient
      .get<ResponeBookCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.bookCategory));
  }

  getSearchedBooksWithThisKeyword(keyword: string): Observable<Book[]> {
    const searchUrl = `${this.baseUrl}/search/search_by_keyword?keyword=${keyword}`;
    return this.fetchBooksList(searchUrl);
  }

  private fetchBooksList(searchUrl: string): Observable<Book[]> {
    return this.httpClient
      .get<ResponseBooks>(searchUrl)
      .pipe(map((response) => response._embedded.books));
  }
}

interface ResponseBooks {
  _embedded: {
    books: Book[];
  };
}

interface ResponeBookCategory {
  _embedded: {
    bookCategory: BookCategory[];
  };
}
