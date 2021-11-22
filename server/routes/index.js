//Here it installs the express and create a new router.
//Then it uses the get method from the router

let express = require('express');
let router = express.Router();

/* GET home page. */
//The following event will trigger everything a user goes to the main browser
//router.get('/', function(req, res, next) {
  //res.render says: render this page that is inside the views folder call index.
  //Here we are passing an object with a title property. This is the binding part.
  //res.render('index', 
  //This is an anonymous object, but you could always create a class.
  //{ title: 'Express'
  //});
//});


//Here, we created two home pages, just in case someone would write / or /home.
//Both of these routes will bring the user to the same place.

let indexController = require('../controllers/index');


//HOME
//router.get('/', indexController.displayHomePage);

//router.get('/home', indexController.displayHomePage);

//ABOUT ME
//router.get('/about', indexController.displayAboutPage);

//PROJECTS
//router.get('/projects', indexController.displayProjectsPage);

//SERVICES
//router.get('/services', indexController.displayServicesPage);

//CONTACT ME
//router.get('/contact', indexController.displayContactPage);

/*GET Route for diplaying the Login page*/
//router.get('/login', indexController.displayLoginPage);

/*POST Route for processing the Login page*/
router.post('/login',indexController.processLoginPage); 

/*GET Route for diplaying the Register page*/
//router.get('/register', indexController.displayRegisterPage);

/*POST Route for processing the Register page*/
router.post('/register',indexController.processRegisterPage); 

/*GET to perform UserLogout*/
router.get('/logout', indexController.performLogout);

module.exports = router;
