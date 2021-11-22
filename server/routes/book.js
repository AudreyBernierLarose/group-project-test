//This is the book route


let express = require('express');
const { removeData } = require('jquery');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

let passport = require('passport');

//Connect to our bookModel
//Keep this variable almost like a class, Pascal Case
//let Book = require('../models/book');
let bookController = require('../controllers/book');

//helper function for guard purposes
function requireAuth(req, res, next)
{
    //check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next(); //Allows to go to the next event
}

//All pages with requireAuth has to be authenticated before anybody is allowed to do anything
/*GET Route for the Book List page - READ operation*/
router.get('/', bookController.displayBookList);

/*GET Route for diplaying the Add page - Create operation*/
//router.get('/add', requireAuth, bookController.displayAddPage);

/*POST Route for processing the Add page - Create operation*/
router.post('/add', passport.authenticate('jwt', {session: false}), bookController.processedAddPage);

/*GET Route for diplaying the Edit page - Update operation*/
//router.get('/edit/:id', requireAuth, bookController.displayEditPage);

/*POST Route for processing the Edit page - Update operation*/
router.post('/edit/:id', passport.authenticate('jwt', {session: false}), bookController.processEditPage);

/*GET to perform Deletion - Delete operation*/
router.get('/delete/:id', passport.authenticate('jwt', {session: false}), bookController.performDelete);

module.exports = router;


