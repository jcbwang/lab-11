'use strict';

//Application dependencies
const express = require('express');
const superagent = require('superagent');

//Application setup
const app = express();
const PORT = process.env.PORT || 3000;

//Application middleware
app.use(express.urlencoded({extend: true}));
app.use(express.static('public'));

//Set view engine for server side templating
app.set('view engine', 'ejs');

//API routes
//Renders search form
app.get('/', newSearch);

app.get('/hello',(request,response) => {
  response.render('./pages/index')
  console.log('')
})
//Create new search to Google API
app.post('/searches', createSearch);

//Catchall
app.get('*',(request,response) => response.status(404).send('This route does not exist.'));

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

function handleError(err, response) {
  console.error(err);
  if (res) res.status(500).send('Sorry, something went wrong.');
}

//Helper functions
function Book(items){
  const placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';
  this.image = items.imageLinks.thumbnail;
  this.title = items.title || 'No title available';
  this.author = items.author || 'No results under this author.';
  this.description = items.description;
  console.log(this.author);
  console.log(this.description);
}

function newSearch(request,response){
  response.render('pages/index');
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
        apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)
      .then(results => response.render('pages/searches/show', {searchResults: results}))

      };
  
  .catch(error => handleError(error, response)); 
}
