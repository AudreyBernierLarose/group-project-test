import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/book.model';
import { BookRepository } from 'src/app/model/book.repository';
import { Cart } from 'src/app/model/cart.model';

@Component({
  templateUrl: './book-editor.component.html'
})
export class BookEditorComponent implements OnInit {
  editing = false;
  book: Book = new Book();


  constructor(private repository: BookRepository,
              private router: Router,
              activeRoute: ActivatedRoute,
              public cart: Cart,
              private location: Location) 
  {
    this.editing = activeRoute.snapshot.params.mode === 'edit'; //IF this is in edit mode

    if(this.editing)
    {
      //Assigning the value of this.book to the one we will get from the repository
      Object.assign(this.book, repository.getBook(activeRoute.snapshot.params.id));
    }
  }

  ngOnInit(): void {
  }

  save(form: NgForm): void
  {
    this.repository.saveBook(this.book); //This could not work
    this.cart.addLine(this.book); 
    //this.location.back();  
    this.router.navigateByUrl('/admin/main/books');
  }

}
