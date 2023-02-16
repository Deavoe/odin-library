let myLibrary = [];
let editing = false;
let selectedBook = null;
let selectedElement = null;

const htmlRoot = document.documentElement;
const bookContainer = document.querySelector('.container');
const themeButton = document.querySelector('.theme');

const form = document.getElementById('signup');
const formTitle = document.getElementById('book-name');
const formAuthor = document.getElementById('author-name');
const formPages = document.getElementById('page-num');
const formFinish = document.getElementById('finish');

// Toggle form visibility
function toggleForm() {
  form.reset();
  form.classList.toggle('hidden');
  if (form.classList.contains('hidden')) {
    editing = false;
    selectedBook = null;
    selectedElement = null;
  } else if (selectedBook !== null && selectedElement !== null) {
    formTitle.value = selectedBook.title;
    formAuthor.value = selectedBook.author;
    formPages.value = selectedBook.pages;
    if (selectedBook.finish !== null) {
      formFinish.checked = true;
    } else {
      formFinish.checked = false;
    }
  }
}
document.querySelector('.cancel-form').addEventListener('click', toggleForm);
document.querySelector('.add').addEventListener('click', toggleForm);

// Toggle theme
document.querySelector('.theme').addEventListener('click', () => {
  themeButton.src = !htmlRoot.classList.contains('dark') ? themeButton.src = './icons/theme-light.svg' : themeButton.src = './icons/theme-dark.svg';
  htmlRoot.classList.toggle('dark');
});

// Book Buttons
// [X] Finish toggle
// [X] Delete functionality
// [ ] Edit functionality
function CompleteBook(book, bool) {
  const text = book.querySelector('.book-finish');
  if (bool === true) { text.classList.toggle('book-complete'); }
  if (text.classList.contains('book-complete')) {
    text.textContent = '( COMPLETED )';
    myLibrary[book.dataset.indexnum].finish = 'yes';
  } else {
    text.textContent = '( In Progress )';
    myLibrary[book.dataset.indexnum].finish = null;
  }
}

document.querySelector('body').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) { // Delete
    myLibrary.splice(e.target.parentElement.parentElement.dataset.indexnum, 1);
    e.target.parentElement.parentElement.remove();
  } else if (e.target.classList.contains('edit') && editing === false) { // Edit
    editing = true;
    selectedBook = myLibrary[e.target.parentElement.parentElement.dataset.indexnum];
    selectedElement = e.target.parentElement.parentElement;
    toggleForm();
  } else if (e.target.classList.contains('complete')) { // Finish
    CompleteBook(e.target.parentElement.parentElement, true);
  }
});

// Library

function Book(title, author, pages, finish) { // CONSTRUCTOR
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.finish = finish;
  // .dataset.indexNum = #
}

function addBookToLibrary(book) { // PUSH TO ARRAY
  myLibrary.push(book);
  let finText = 'class="book-finish">( In Progress )';
  if (book.finish !== null) { finText = 'class="book-finish book-complete">( COMPLETED )'; }
  const bookElement = `<div class="book" data-indexNum="${myLibrary.indexOf(book)}">
  <div class="book-content">
      <p class="book-title">${book.title}</p>
      <p class="book-author">by ${book.author}</p>
      <p class="book-pages">Pages: ${book.pages}</p>
      <p ${finText}</p>
  </div>
  <div class="book-icons">
      <img class="complete" src="./icons/finish.svg" alt="Finish">
      <img class="edit" src="./icons/edit.svg" alt="Edit">
      <img class="delete" src="./icons/delete.svg" alt="Delete">
  </div>`;
  const element = document.createElement('div');
  element.innerHTML = bookElement;
  bookContainer.appendChild(element.firstChild);
}

function UpdateBook(book) { // EDITING
  const title = book.querySelector('.book-title');
  const author = book.querySelector('.book-author');
  const pages = book.querySelector('.book-pages');
  title.textContent = selectedBook.title;
  author.textContent = `by ${selectedBook.author}`;
  pages.textContent = `Pages: ${selectedBook.pages}`;
  CompleteBook(book);
}

document.getElementById('signup').addEventListener('submit', (e) => { // SUBMIT AND DISPLAY BOOK
  e.preventDefault();
  const formData = new FormData(e.target);
  //   for (const pair of formData.entries()) {
  //     console.log(`${pair[0]}: ${pair[1]}`);
  //   }
  if (editing === false) {
    addBookToLibrary(new Book(formData.get('book-name'), formData.get('author-name'), formData.get('page-num'), formData.get('finish')));
  } else if (selectedBook !== null && selectedElement !== null) {
    selectedBook.title = formData.get('book-name');
    selectedBook.author = formData.get('author-name');
    selectedBook.pages = formData.get('page-num');

    const text = selectedElement.querySelector('.book-finish');
    selectedBook.finish = formData.get('finish');
    if ((formData.get('finish') !== null && !text.classList.contains('book-complete')) || (formData.get('finish') === null && text.classList.contains('book-complete'))) { text.classList.toggle('book-complete'); }

    UpdateBook(selectedElement);
  }
  toggleForm();
});
