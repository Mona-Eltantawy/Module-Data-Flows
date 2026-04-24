// ✅ Data
const myLibrary = [];

// ✅ DOM elements (clear naming)
const formEl = document.getElementById("bookForm");
const titleInputEl = document.getElementById("title");
const authorInputEl = document.getElementById("author");
const pagesInputEl = document.getElementById("pages");
const checkInputEl = document.getElementById("check");
const tableBodyEl = document.querySelector("#display tbody");
const messageEl = document.getElementById("message");

// ✅ Init
window.addEventListener("load", () => {
  populateStorage(); // only called once
  render();
});

// ✅ Populate initial data
function populateStorage() {
  if (myLibrary.length === 0) {
    myLibrary.push(
      new Book("Robinson Crusoe", "Daniel Defoe", 252, true),
      new Book("The Old Man and the Sea", "Ernest Hemingway", 127, true)
    );
  }
}

// ✅ Handle form submit (NO inline onclick)
formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  // 🔹 Preprocessing
  const title = titleInputEl.value.trim();
  const author = authorInputEl.value.trim();
  const pages = Number(pagesInputEl.value);
  const isRead = checkInputEl.checked;

  // 🔹 Validation
  if (!title || !author) {
    showMessage("Title and Author cannot be empty.");
    return;
  }

  if (Number.isNaN(pages) || pages < 1 || pages > 9999) {
    showMessage("Pages must be between 1 and 9999.");
    return;
  }

  // 🔹 Add book
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);

  // 🔹 Reset form
  formEl.reset();

  render();
});

// ✅ Constructor
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages; // number (correct type)
  this.isRead = isRead;
}

// ✅ Render table
function render() {
  // 🔹 Efficient clear
  tableBodyEl.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const row = document.createElement("tr");

    const titleCell = document.createElement("td");
    const authorCell = document.createElement("td");
    const pagesCell = document.createElement("td");
    const readCell = document.createElement("td");
    const deleteCell = document.createElement("td");

    // 🔹 Safe text assignment
    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    pagesCell.textContent = book.pages;

    // 🔹 Toggle read button (simplified)
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "btn btn-success";
    toggleBtn.textContent = book.isRead ? "Yes" : "No";

    toggleBtn.addEventListener("click", () => {
      book.isRead = !book.isRead;
      render();
    });

    readCell.appendChild(toggleBtn);

    // 🔹 Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-warning";
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      // delete first
      const deletedTitle = book.title;
      myLibrary.splice(index, 1);

      // then show message (non-blocking)
      showMessage(`Deleted: "${deletedTitle}"`);
      render();
    });

    deleteCell.appendChild(deleteBtn);

    row.append(titleCell, authorCell, pagesCell, readCell, deleteCell);
    tableBodyEl.appendChild(row);
  });
}

// ✅ Non-blocking message (instead of alert)
function showMessage(text) {
  messageEl.textContent = text;

  setTimeout(() => {
    messageEl.textContent = "";
  }, 2000);
}
