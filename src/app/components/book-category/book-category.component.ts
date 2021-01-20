import { Component, OnInit } from '@angular/core';
import { BookCategory } from 'src/app/common/book-category';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.scss']
})
export class BookCategoryComponent implements OnInit {
  bookCategories: BookCategory[] | undefined;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBookCategories();
  }

  getBookCategories() {
    this.bookService.getBookCategories().subscribe((data) => this.bookCategories = data);
  }

}
