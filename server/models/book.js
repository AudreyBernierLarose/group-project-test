let mongoose = require('mongoose');

//Create a model class
//.Schema is almost like a structure
//The schema allows for CRUD to happen
let bookModel = mongoose.Schema({
//Everytime we create a book, we use this, a model is just a class and the schema is like a struct
    name: String,
    author: String,
    published: String,
    description: String,
    price: Number
},
{
    //books is the table within the database, the one we did in the previous video
    collection: "books"
});

module.exports = mongoose.model('Book', bookModel);