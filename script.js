// Toggle form visibility
const form = document.getElementById('signup');
function toggleForm() {
  form.classList.toggle('hidden');
}
document.querySelector('.cancel-form').addEventListener('click', toggleForm);
document.querySelector('.add').addEventListener('click', toggleForm);

// Toggle theme
const documentRoot = document.documentElement;
const themeButton = document.querySelector('.theme');
document.querySelector('.theme').addEventListener('click', () => {
  themeButton.src = !documentRoot.classList.contains('dark') ? themeButton.src = './icons/theme-light.svg' : themeButton.src = './icons/theme-dark.svg';
  documentRoot.classList.toggle('dark');
});

let myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // do stuff here
}
