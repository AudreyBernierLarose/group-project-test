import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book.model';
import { Cart } from 'src/app/model/cart.model';
import { Order } from 'src/app/model/order.model';
import { OrderRepository } from 'src/app/model/order.repository';

@Component({
  selector: 'app-order-editor',
  templateUrl: './order-editor.component.html',
  styleUrls: ['./order-editor.component.css']
})
export class OrderEditorComponent implements OnInit {
  submitted = false;
  orderSent = false;

  constructor(private router: Router,
              public order: Order,
              private repository: OrderRepository,
              public cart: Cart) { }

  ngOnInit(): void {
  }

  submitOrder(form: NgForm): void
  {
    this.submitted = true;
    if(form.valid)
    {
        this.repository.saveOrder(this.order).subscribe(order => {
        this.order.clear();
        this.orderSent = true;
        this.submitted = false;
      });
    }
  }

  addBook(): void //This should be on the next page
  {
    this.router.navigateByUrl('/admin/main/books');
  }

  orderList(): void
  {
    this.router.navigate(['/admin/main/orders']).then(() => {window.location.reload()}); //Same fix as teacher 
  }
}
