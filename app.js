// Using ES5 Syntax

// Basically, Prototypes and Constructor methods

// Book Constructor
// This constructor will be tasked with creating the book object

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
// This constructor will handle all things UI, from showing the alerts to adding book to the list and deleting the book from the list

function UI() {}

UI.prototype.addBookToTable = function(book) {
  const list = document.getElementById('book-list');

  // Create tr element
  const row = document.createElement('tr');
  console.log(row);
};

// Event Listeners
const form = document.getElementById('book-form');

form.addEventListener('submit', submittedForm);

function submittedForm(e) {
  // Get form values

  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  // Instantiate a book object
  const book = new Book(title, author, isbn);

  // Instantiate a UI object
  const ui = new UI();

  ui.addBookToTable(book);

  e.preventDefault();
}
