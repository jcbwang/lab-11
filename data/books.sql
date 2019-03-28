DROP TABLE IF EXISTS books;
CREATE TABLE books(
  id SERIAL PRIMARY KEY,
  image_url VARCHAR(255),
  title VARCHAR(255),
  authors VARCHAR(255),
  description TEXT,
  isbn VARCHAR(255),
  bookshelf VARCHAR(255)
);

INSERT INTO books (image_url, title, authors, description, isbn, bookshelf)
VALUES('https://i.imgur.com/J5LVHEL.jpg', 'Green Eggs and Ham','Dr.Seuss', 'blah blah blah blah', 'ISBN29392029', 'children');

INSERT INTO books (image_url, title, authors, description, isbn, bookshelf)
VALUES('https://i.imgur.com/J5LVHEL.jpg', 'Harry Potter','J.K. Rowling','abracadabra blah blah blah', 'ISBN29392029','fantasy');

