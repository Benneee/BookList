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

  // Insert columns to the row
  // This is done by adding the values of the book object in between
  // td tags, which stand for data-cell... basically holding the cell details
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class='delete'>x</a></td>    
  `;
  list.appendChild(row);
};

// Show Alerts
UI.prototype.showAlert = function(message, className) {
  // Create the element
  const div = document.createElement('div');

  // Add class
  div.className = `alert ${className}`;

  // Add the message to the element created
  div.appendChild(document.createTextNode(message));

  // Insert into the DOM
  // Get a parent
  const container = document.querySelector('.container');

  // Get another parent - This would be the element we would be insert our alert before
  const form = document.querySelector('#book-form');

  // Inserting alert into the DOM now
  container.insertBefore(div, form);

  // Timeout after 3secs
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
};

// Delet a book
UI.prototype.deleteBook = target => {
  // Our target in this place is the link tag
  // Deleting the link tag won't take away our book, we want to traverse through the DOM
  // First up is the parent element, the <td> tags, data cell
  // Next up is the <tr> tags, holding our book object, here, we can now remove from the DOM tree
  target.className === 'delete' ? target.parentElement.parentElement.remove() : null;
};

// The method to clear form fields after submission
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

// Event Listeners
const form = document.getElementById('book-form');

// Listener To Add Book
form.addEventListener('submit', addBook);

function addBook(e) {
  // Get form values

  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  // Instantiate a book object
  const book = new Book(title, author, isbn);

  // Instantiate a UI object
  const ui = new UI();

  // Validate form entries/submission
  title === '' || author === '' || isbn === ''
    ? ui.showAlert('Please fill in all fields', 'error')
    : (ui.addBookToTable(book), ui.showAlert('Book added successfully', 'success'), ui.clearFields());

  e.preventDefault();
}

// Listener To Delete Book
const bookList = document.getElementById('book-list');
// We need to use a parent here, the parent holds all the books added to the list

bookList.addEventListener('click', deleteBook);

function deleteBook(e) {
  // This log shows that when we click anywhere on the new book added, we can delete it
  // However, we don't want to do that, we need to target the link element and that should handle deletion
  // We do this with a prototype method
  // console.log('delete book');

  const ui = new UI();

  // Delete book using the prototype created above
  ui.deleteBook(e.target);

  // Show alert after deleting book
  ui.showAlert('Book deleted successfully', 'success');

  e.preventDefault();
}
