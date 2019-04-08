DROP TABLE IF EXISTS books;

CREATE TABLE books(
  id SERIAL PRIMARY KEY,
  image VARCHAR(255),
  title VARCHAR(255),
  authors VARCHAR(255),
  description TEXT,
  isbn VARCHAR(255),
  bookshelf VARCHAR(255)
);

INSERT INTO books (image, title, authors, description, isbn, bookshelf)
VALUES('https://i.imgur.com/J5LVHEL.jpg', 'Green Eggs and Ham','Dr.Seuss', 'blah blah blah blah', 'ISBN29392029', 'children');

INSERT INTO books (image, title, authors, description, isbn, bookshelf)
VALUES('https://i.imgur.com/J5LVHEL.jpg', 'Harry Potter','J.K. Rowling','abracadabra blah blah blah', 'ISBN29392029','fantasy');

INSERT INTO books (image, title, authors, description, isbn, bookshelf)
VALUES('http://books.google.com/books/content?id=h7w4DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
', 'Green Eggs and Hams','Dr.Seuss','Do you like green eggs and ham?” asks Sam-I-am in this Beginner Book by Dr. Seuss. In a house or with a mouse? In a boat or with a goat? On a train or in a tree? Sam keeps asking persistently. With unmistakable characters and signature rhymes, Dr. Seuss’s beloved favorite has cemented its place as a children’s classic. In this most famous of cumulative tales, the list of places to enjoy green eggs and ham, and friends to enjoy them with, gets longer and longer. Follow Sam-I-am as he insists that this unusual treat is indeed a delectable snack to be savored everywhere and in every way. Originally created by Dr. Seuss, Beginner Books encourage children to read all by themselves, with simple words and illustrations that give clues to their meaning. This Read & Listen edition contains audio narration.','ISBN29392029','children');


