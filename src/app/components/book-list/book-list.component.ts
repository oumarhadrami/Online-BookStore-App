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
    const hasCategoryIdParam: boolean = this.activatedRoute.snapshot.paramMap.has(
      'id'
    );
    if (hasCategoryIdParam)
      this.currentCategoryId = Number(
        this.activatedRoute.snapshot.paramMap.get('id')
      );
    else this.currentCategoryId = 1;
    this.bookService.getBooks(this.currentCategoryId).subscribe((data) => (this.books = data));
  }
}
