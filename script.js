let myLibrary = [];
const bookContainer = document.querySelector('.container');
const form = document.getElementById('signup');
const htmlRoot = document.documentElement;
const themeButton = document.querySelector('.theme');

// Toggle form visibility
function toggleForm() {
  form.reset();
  form.classList.toggle('hidden');
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
let editing = false;
document.querySelector('body').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) { // myLibrary.splice(index, 1) + update container
    myLibrary.splice(e.target.parentElement.parentElement.dataset.indexnum, 1);
    e.target.parentElement.parentElement.remove();
  } else if (e.target.classList.contains('edit') && editing === false) {
    editing = true;
  } else if (e.target.classList.contains('complete')) {
    const text = e.target.parentElement.parentElement.querySelector('.book-finish');
    text.classList.toggle('book-complete');
    if (text.classList.contains('book-complete')) {
      text.textContent = '( COMPLETED )';
      myLibrary[e.target.parentElement.parentElement.dataset.indexnum].finish = 'yes';
    } else {
      text.textContent = '( In Progress )';
      myLibrary[e.target.parentElement.parentElement.dataset.indexnum].finish = null;
    }
  }
});

function Book(title, author, pages, finish) { // .dataset.indexNum = #
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.finish = finish;
}
function addBookToLibrary(book) {
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

function UpdateLibrary() {
  myLibrary.forEach((book, i) => {
    let finText = 'class="book-finish">( In Progress )';
    if (book.finish !== null) { finText = 'class="book-finish book-complete">( COMPLETED )'; }
    const bookElement = `<div class="book" data-indexNum="${i}">
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
  });
}

document.getElementById('signup').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  //   for (const pair of formData.entries()) {
  //     console.log(`${pair[0]}: ${pair[1]}`);
  //   }
  addBookToLibrary(new Book(formData.get('book-name'), formData.get('author-name'), formData.get('page-num'), formData.get('finish')));
  toggleForm();
});
