# Bookshelf with Express Toolkit + Docker

- REST-API that allows searchs, update, delete books of a data base in a backend (don't have frontend with inputs) + docker to build the app.

# Requirements

- Mongodb (at localhost)
- Postman or similar (e.g Insomnia)
- Node.js
- Docker

# Used programs

- OS W10 Pro x64
- Microsoft Visual Studio Code v.1.66.0
- Postman v.9.15.2
- Node.js v.16.14.2
  - Express v.4.17.3
  - Mongoose v.6.2.9
  - Nodemon v.2.0.15 (in the development)
  - uuid v.8.3.2
- MongoDB v.5.0.6
- MongoDB Compass v.1.30.1
- Docker desktop v.4.6.1

# How to use

1. Start **Node.js** and **Mongo.db**
2. Open a terminal and go to folder directory **CD /path/of/the/folder**
4. Run **docker-compose up -d --build**
5. Start postman and use methods
6. Methods
   - Get all books **GET http://localhost:5000/v1/books**
   - Filter books by ID **GET http://localhost:5000/v1/books/[uuid]**
   - Filter books by any parameter **GET http://localhost:5000/v1/books?[parameter1=value&parameterN=value]**
   - Add a book **POST http://localhost:5000/v1/books**
   - Update a book **PUT http://localhost:5000/v1/books/[uuid]**
   - Delete a book **DELETE http://localhost:5000/v1/books/[uuid]**
   - Delete all books **DELETE http://localhost:5000/v1/books**
