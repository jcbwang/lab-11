DROP TABLE IF EXISTS books;
CREATE TABLE books(
  id SERIAL PRIMARY KEY,
  image_url VARCHAR(255),
  title VARCHAR(255),
  authors VARCHAR(255),
  isbn VARCHAR(255),
  description TEXT
);

INSERT INTO books (image_url, title, authors, isbn, description)
VALUES('https://i.imgur.com/J5LVHEL.jpg', 'Green Eggs and Ham','Dr.Seuss','ISBN29392029','blah blah blah blah');

INSERT INTO books (image_url, title, authors, isbn, description)
VALUES('https://i.imgur.com/J5LVHEL.jpg', 'Harry Potter','J.K. Rowling','ISBN29392029','abracadabra blah blah blah');

