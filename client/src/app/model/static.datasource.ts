import { Injectable } from '@angular/core';
import {Book} from './book.model';
import { from, Observable } from 'rxjs';
import { Order } from './order.model';


@Injectable()
export class StaticDataSource
{
    private books: Book[] = 
    [
        new Book(1, 'Book 1', 'Author 1', 'Year 1', 'Short Description 1', 10),
        new Book(2, 'Book 2', 'Author 1', 'Year 2', 'Short Description 2', 20),
        new Book(3, 'Book 3', 'Author 1', 'Year 3', 'Short Description 3', 30),
        new Book(4, 'Book 4', 'Author 1', 'Year 4', 'Short Description 4', 40),
        new Book(5, 'Book 5', 'Author 1', 'Year 5', 'Short Description 5', 50),
        new Book(6, 'Book 6', 'Author 2', 'Year 6', 'Short Description 6', 60),
        new Book(7, 'Book 7', 'Author 2', 'Year 7', 'Short Description 7', 70),
        new Book(8, 'Book 8', 'Author 2', 'Year 8', 'Short Description 8', 80),
        new Book(9, 'Book 9', 'Author 2', 'Year 9', 'Short Description 9', 90),
        new Book(10, 'Book 10', 'Author 3', 'Year 10', 'Short Description 10', 110),
        new Book(11, 'Book 11', 'Author 3', 'Year 11', 'Short Description 11', 111),
        new Book(12, 'Book 12', 'Author 3', 'Year 12', 'Short Description 12', 112),
        new Book(13, 'Book 13', 'Author 4', 'Year 13', 'Short Description 13', 113),
        new Book(14, 'Book 14', 'Author 4', 'Year 14', 'Short Description 14', 114),
        new Book(15, 'Book 15', 'Author 4', 'Year 15', 'Short Description 15', 115)
    ];

    getBooks(): Observable<Book[]>
    {
        return from([this.books]);
    }

    saveOrder(order: Order): Observable<Order>
    {
        console.log(JSON.stringify(order));
        return from ([order]);
    }
}