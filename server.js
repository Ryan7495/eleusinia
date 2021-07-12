const path = require('path');
const express = require('express');
const authentication = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const multer = require('multer');
const validator = require("email-validator")
const axios = require('axios');


var authenticated = false;
var registered = false;
const PORT = process.env.PORT || 1337;
const id = '1a36346d1dfb4531a11e1fae830c3076';
const app = express();
const upload = multer();

const connection = mysql.createConnection
({
	host: "",
  	user: "eleusinia",
  	password: "",
  	database: ""
});

//Open a connection with the SQL database
connection.connect(function(err) {
  if (err) { throw err; }
  console.log("Database connected.");
});

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: "Your secret key", 
	resave: false,
  	saveUninitialized: true,
	cookie:{ maxAge: 60000, domain:'localhost:3000' }}));

//Production
//app.use(express.static(path.join(__dirname, '/client/build')));

//Development
app.use(express.static(path.join(__dirname, '/client/public')));

//Handle HTTP GET requests from clients
app.get('/', function (req, res) { 
	console.log('Serving /index.html');
	res.sendFile(__dirname + '/client/public/index.html')
});

app.get('/register', function(req, res){
	console.log('Serving /register');
	res.redirect('/register');
});

app.get('/login', function(req, res){
	console.log('Serving /login');
	res.send('/login')
});

app.get('/logout', function(req, res){
	console.log('Serving /logout');
	authenticated = false;
	res.redirect('/login');
});

app.get('/boxes', function(req, res){
	console.log('Serving /boxes');
	var boxes = 'SELECT * FROM eleusinia.Boxes';

	connection.query(
		boxes, function (results, fields) {
			res.json(fields)
		});
});

app.get('/boxes/:search', function(req, res){
	console.log('Serving /boxes');
	const search = req.params.search;

	var boxes;
	// if (search === NULL){
	// 	boxes = 'SELECT * FROM eleusinia.Boxes';
	// }
	// else{
		boxes = 'SELECT *,  MATCH (`Name`,`Price`,`Producer`,`Description`) AGAINST ('
			+ "'" + search + "'" + ') as score FROM eleusinia.Boxes WHERE MATCH ' +
			'(`Name`,`Price`,`Producer`,`Description`) AGAINST ('
			+ "'" + search + "'" + ') > 0 ORDER BY score DESC;';
	// }

	connection.query(
		boxes, function (results, fields) {
			res.json(fields)
		});
});

//Makes an API call to Spoontacular requesting 12 recipes.
//Forwards the recipes to the client.
app.get('/recipes', function(req, res){
	console.log('Serving /recipes')

	axios.get("https://api.spoonacular.com/recipes/random?number=12&apiKey="+id,{})
	.then((result)=>{
        console.log("Succsessful API call");
        res.json(result.data.recipes);
    }).catch((error)=>{
        console.log("Unable to make API call");
    });
});

//Makes an API call to Spoontacular requesting 4 recipes.
//Forwards the recipes to the client.
app.get('/home', function(req, res){
	console.log('Serving /home')

	axios.get("https://api.spoonacular.com/recipes/random?number=4&apiKey="+id,{})
	.then((result)=>{
        console.log("Succsessful API call");
        res.json(result.data.recipes);
    }).catch((error)=>{
        console.log("Unable to make API call");
    });
});

/* Handlers for client HTTP POST requests */

/*	
	Checks the validity of the email and passcode format.
	Hashes passcodes with 16 rounds of salt.
	Checks the database for an existing account registered
	under the desired email. If no email record exsists, it then
	tries to register the account with the database.
*/	
app.post('/register', (req, res) => {
	const hash = bcrypt.hashSync(req.body.passcode, 16);
	
	var email_query = `SELECT 1 FROM Users WHERE Email = '${req.body.email}';`
	var register_query = `IF NOT EXISTS ( SELECT 1 FROM Users WHERE Email = '${req.body.email}' ) BEGIN INSERT INTO Users (FirstName, LastName, Email, Passcode) VALUES ('${req.body.firstname}', '${req.body.lastname}', '${req.body.email}', '${hash}') END`
	register_query = `INSERT INTO Users (FirstName, LastName, Email, Passcode) VALUES ('${req.body.firstname}', '${req.body.lastname}', '${req.body.email}', '${hash}')`

	new Promise(function(resolve, reject) {
		if (validator.validate(req.body.email) && req.body.passcode.length >= 8) {
			connection.query(email_query, function (err, result, fields) { 
    			if (err) { console.log(err); }
    			resolve(result)
    		})
    	} 
    	else { throw err; }
	})
	.then(function(result){
		if (String(result).length > 1) { 
    		console.log(`An account is already registered with: ${req.body.email}`);
    		//res.send('/register');
    		res.json({error: 'An account is already registered with this email.'});
    	} else {
    		connection.query(register_query, function (err, result, fields) {
    			if (err) { console.log(err); }
  			});
  			registered = true;
  			console.log(`New account created: ${req.body.email}`)
  			res.redirect('/login');
    	}
	})
	.catch(function(err) {  
		//TODO: update client
		console.log(`Unable to register: ${req.body.email}. Invalid format.`) 
	})
});

/*	
	Checks the validity of the email and passcode format.
	Hashes passcodes with 16 rounds of salt.
	Checks the database for an existing account registered
	under the email and compares the hashed passcode. if 
	authentication is valid, the user is given a session.
*/	
app.post('/login', (req, res) => {
	var email_query = `SELECT Passcode FROM Users WHERE Email = '${req.body.email}';`

	new Promise(function(resolve, reject) {
		if (validator.validate(req.body.email)){
			connection.query(email_query, function (err, result, fields) { 
    			if (err) { console.log(err); }
    			resolve(result)
    		})
		} else { throw err; }
	})
	.then(function(result){
		if (bcrypt.compareSync(req.body.passcode, Object.assign({}, result[0]).Passcode)) {
			authenticated = true;
			console.log(`authenticated: ${req.body.email}`);
			console.log(req.cookies);
			console.log(req.sessionID);
			console.log(req.session);
	
			if(req.cookies.sessionID === undefined) {
				console.log("Undefined session.");
				res.cookie('sid', req.sessionID).send('/boxes');
			} else{
				console.log("Defined session.");
				req.session.reload(() => {res.redirect('/boxes')} );
			}
		} else { console.log(`${req.body.email} FAILED authentication.`); res.redirect('/login')}
	})
	.catch(function(err) { 
		//TODO: update client
		console.log(`Unable to authenticate: ${req.body.email}. Invalid format.`) 
	})
});

app.post('/addToCart', function(req, res){
	req.session.cart.push(req.body.text_sent);
	// TODO: modify what is being pushed to session.cart
	// res.render('loggedIn', {diary: req.session.diary});
});

app.post('/checkout', function(req, res){
	req.session.cart = [];
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
