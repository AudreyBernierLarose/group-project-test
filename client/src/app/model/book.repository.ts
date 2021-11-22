//connects to the data model
import { Injectable } from "@angular/core";
import {Book} from "./book.model";
import { RestDataSource } from "./rest.datasource";
import { StaticDataSource } from "./static.datasource";

@Injectable()
export class BookRepository
{
    private books: Book[] = [];
    private authors: string[] = [];

    //The private dataSource: StaticDataSource in the constructor is the same as saying:
    //this.dataSource = dataSource;
    constructor(private dataSource: RestDataSource)
    {
        dataSource.getBooks().subscribe(data => {
            this.books = data;
            this.authors = data.map(b => b.author)
            .filter((a, index, array) => array.indexOf(a) === index).sort() as string[]; // If this does not workk.... problem is somewhere on this line
        });
    }

    getBooks(author?: string): Book[]
    {
      return this.books
        .filter(b => author == null || author === b.author);
    }

    getBook(id: number): Book
    {
        return this.books.find(b => b._id === id) as Book;
    }

    getAuthors(): string[]
    {
        return this.authors;
    }

    saveBook(savedBook: Book): void
    {
        if(savedBook._id === null || savedBook._id === 0 || savedBook._id === undefined)
        {
            this.dataSource.addBook(savedBook).subscribe(b => {
                this.books.push(savedBook);
            })
        }
        else
        {
            this.dataSource.updateBook(savedBook).subscribe(book => {
                this.books.splice(this.books.findIndex(b => b._id === savedBook._id), 1, savedBook);
            });
        }
    }

    deleteBook(deletedBookID: number): void
    {
        this.dataSource.deleteBook(deletedBookID).subscribe(book => {
            this.books.splice(this.books.findIndex(b => b._id === deletedBookID), 1);
        })
    }

}