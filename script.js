const myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = self.crypto.randomUUID();
    this.info = function (){
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + (this.read?"read":"not read yet");
    }
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
  // take params, create a book then store it in the array
}


function updateLibrary() {
    const tblBody = document.querySelector("tbody");
    tblBody.innerHTML = ''; // clear previous rows

    for (const book of myLibrary) {
        const newRow = document.createElement("tr");

        const id_cell = document.createElement("td");
        const title_cell = document.createElement("td");
        const author_cell = document.createElement("td");
        const pages_cell = document.createElement("td");
        const read_cell = document.createElement("td");
        const delete_button = document.createElement("button");
        const toggle_read = document.createElement("button");

        read_cell.className = 'read_cell';
        delete_button.className = 'delete_book';
        toggle_read.className = 'toggle_read';

        id_cell.textContent = book.id;
        title_cell.textContent = book.title;
        author_cell.textContent = book.author;
        pages_cell.textContent = book.pages;
        read_cell.textContent = book.read ? "Yes" : "No";

        delete_button.textContent = '🗑️';
        toggle_read.textContent = 'Toggle';

        delete_button.addEventListener('click', () => {
            const index = myLibrary.findIndex(b => b.id === book.id);
            if (index !== -1) {
                myLibrary.splice(index, 1);
                updateLibrary();
            }
        });

        toggle_read.addEventListener('click', () => {
            book.read = !book.read;
            updateLibrary();
        });

        read_cell.appendChild(toggle_read);
        read_cell.appendChild(delete_button);

        newRow.appendChild(id_cell);
        newRow.appendChild(title_cell);
        newRow.appendChild(author_cell);
        newRow.appendChild(pages_cell);
        newRow.appendChild(read_cell);

        tblBody.appendChild(newRow);
    }
}



addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("Sapiens", "Yuval Noah Harari", 498, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);



document.body.onload = updateLibrary;

const NewBookButton = document.getElementById("NewBookButton");

const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

NewBookButton.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const submit = document.getElementById('submit');
submit.onclick = function(event) {
    event.preventDefault();  // prevent page reload

    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const read = document.getElementById('read');
    

    addBookToLibrary(title.value, author.value, pages.value, read.checked);
    updateLibrary();

    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;

    modal.style.display = "none"; // close modal
}


