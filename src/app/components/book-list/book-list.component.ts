import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  // templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: Book[] | undefined;
  currentCategoryId: number | undefined;
  searchMode: boolean | undefined;
  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.getBooks();
    });
  }

  getBooks() {
    this.searchMode = this.activatedRoute.snapshot.paramMap.has('keyword');
    if (this.searchMode) this.getSearchedBooks();
    else this.getBooksByCategory();
  }

  getSearchedBooks() {
    const keyword: string = String(this.activatedRoute.snapshot.paramMap.get('keyword'));
    this.bookService.getSearchedBooksWithThisKeyword(keyword).subscribe((data) => (this.books = data));
  }

  getBooksByCategory() {
    const hasCategoryIdParam: boolean = this.activatedRoute.snapshot.paramMap.has(
      'id'
    );
    if (hasCategoryIdParam)
      this.currentCategoryId = Number(
        this.activatedRoute.snapshot.paramMap.get('id')
      );
    else this.currentCategoryId = 1;
    this.bookService
      .getBooks(this.currentCategoryId)
      .subscribe((data) => (this.books = data));
  }


  addToCart(book: Book){
    console.log(book);
  }
}
