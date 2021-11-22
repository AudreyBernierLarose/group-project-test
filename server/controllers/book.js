let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

//Create a reference to the db schema which is the model
let Book = require('../models/book');

module.exports.displayBookList= (req, res, next) => {
    Book.find((err, bookList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BookList);
           /* res.render('book/list', 
            {   title: 'Books', 
                BookList: bookList, 
                displayName: req.user ? req.user.displayName: ''});*/

                res.json(bookList);
        }
    });
};

module.exports.displayAddPage = (req, res, next) => {
    //res.render('book/add', {title: 'Add Book', displayName: req.user ? req.user.displayName: ''});

    res.json({success: true, msg: 'Successfully Displayed Add Page'});
};

module.exports.processedAddPage =  (req, res, next) => {
    let newBook = Book({
        "name": req.body.name, //The req is used to request the information from the Book model and the body is the form field
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });
    
    //This is to create the new book into the database
    Book.create(newBook, (err, Book) => {
     if(err)
     {
         console.log(err);
         res.end(err);
     }
     else
     {
         //refresh the book list by redirecting to the booklist
         //res.redirect('/book-list');

         res.json({success: true, msg: 'Successfully Added a New Book'});
     }
    });
 };

 module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id; //this is the id of the actual object we are getting

    Book.findById(id, (err, bookToEdit) => //This is going to find the book by id in the book table
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            /*res.render('book/edit', {
                title: 'Edit Book',
                book: bookToEdit,
                displayName: req.user ? req.user.displayName: ''});*/

                res.json({success: true, msg: 'Successfully Displayed Book to Edit', book: bookToEdit});
        }
    });
};

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let updatedBook = new Book({
        "_id": id,
        "name": req.body.name, 
       "author": req.body.author,
       "published": req.body.published,
       "description": req.body.description,
       "price": req.body.price
    });

    Book.updateOne({_id: id}, updatedBook, (err) =>
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the book list
            //res.redirect('/book-list');
            res.json({success: true, msg: 'Successfully Edited Book', book: updatedBook});
        }
    });
};

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    Book.deleteOne({_id: id}, (err) => 
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh book list
            //res.redirect('/book-list');
            res.json({success: true, msg: 'Successfully Deleted Book'});
        }
    })
};
