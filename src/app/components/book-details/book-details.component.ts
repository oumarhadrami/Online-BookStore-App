import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  book: Book | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.getBookInfo();
  }

  getBookInfo() {
    const bookId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.bookService.getBook(bookId).subscribe((data) => this.book =data);
  }
}
