'use strict';

//Application dependencies
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
require('dotenv').config();

//environment variables
require('dotenv').config();

//Application setup
const app = express();
const PORT = process.env.PORT || 3000;

//Application middleware
app.use(express.urlencoded({extend: true}));
app.use(express.static('public'));

//Database setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

//Set view engine for server side templating
app.set('view engine', 'ejs');

//API routes
//Renders search form
app.get('/', getBooks);
app.get('./pages/searches/new')

app.get('/hello',(request,response) => {
  response.render('./pages/index')
  console.log('')
})

app.get('/books/detail/:book_id', getOneBook);

//Create new search to Google API
app.post('/searches', createSearch);

//Catchall
app.get('*',(request,response) => response.status(404).send('This route does not exist.'));

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

function handleError(err, response) {
  console.error(err);
  if (response){
    response.render('./pages/error')}
}

//Helper functions
function getBooks(request,response){
  let sql = `SELECT * FROM books;`;
  return client.query(sql)
    .then(results => {
      console.log(results);
      response.render('./pages/index', {results: results.rows});
    })
    .catch(handleError);
}

function getOneBook (request, response) {
  let sql = `SELECT * FROM books WHERE id=$1;`;
  let values = [request.params.book_id];

  return client.query(sql, values)
    .then(result => {
      return response.render('./pages/books/detail', { book: result.rows[0] });
    })
    .catch(error => handleError(error, response));
}


function createSearch(request,response){
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  console.log(request.body);
  if(request.body.search[1] === 'title') {url += `+intitle:${request.body.search[0]}`;}
  if(request.body.search[1] === 'author') {url += `+inauthor:${request.body.search[0]}`;}
  console.log(url);
  superagent.get(url)
    .then(apiResponse => {
      if (!apiResponse.body.items) throw 'NO DATA';
      else {
        let bookArray = apiResponse.body.items.map(bookResult => {
          let book = new Book(bookResult.volumeInfo);
          return book;
        });
        response.render('./pages/searches/show', { searchResults: bookArray });
      }
    })
    .catch(error => handleError(error, response));
}

function Book(items) {
  console.log(items);
  this.image = items.imageLinks ? items.imageLinks.thumbnail : 'https://i.imgur.com/J5LVHEL.jpg';
  this.title = items.title || 'No title available';
  this.authors = items.authors ? items.authors.join(' , ') : 'No results under this author.';
  this.description = items.description ? items.description : 'NO description available.';
  this.isbn = items.industryIdentifiers ? items.industryIdentifiers.join('') : 'No isbn number';
  this.bookshelf = [];
  // this.bookshelf = `SELECT `
  console.log(this.authors);
  console.log(this.description);
}
