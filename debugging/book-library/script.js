let myLibrary = [];

window.addEventListener("load", function () {
  populateStorage();
});

function populateStorage() {
  if (myLibrary.length === 0) {
    let book1 = new Book("Robinson Crusoe", "Daniel Defoe", 252, true);
    let book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      127,
      true
    );

    myLibrary.push(book1, book2);
    render();
  }
}

const titleInputEl = document.getElementById("title");
const authorInputEl = document.getElementById("author");
const pagesInputEl = document.getElementById("pages");
const checkInputEl = document.getElementById("check");

// Add book
function submit() {
  // ✅ Input Preprocessing
  // Sanitization: trim whitespace from text inputs
  const trimmedTitle = titleInputEl.value.trim();
  const trimmedAuthor = authorInputEl.value.trim();
  const pages = Number(pagesInputEl.value);

  // ✅ Input Validation
  // Reject: empty/whitespace-only strings, non-numeric page input, non-positive counts, or values exceeding max
  if (
    !trimmedTitle ||
    !trimmedAuthor ||
    isNaN(pages) ||
    pages < 1 ||
    pages > 9999
  ) {
    alert(
      "Please provide valid input: non-empty title/author and page count between 1-9999!"
    );
    return;
  }

  // ✅ Create and store book with sanitized/validated input
  let book = new Book(trimmedTitle, trimmedAuthor, pages, checkInputEl.checked);
  myLibrary.push(book);

  // ✅ Reset form
  titleInputEl.value = "";
  authorInputEl.value = "";
  pagesInputEl.value = "";
  checkInputEl.checked = false;

  render();
}

// Book constructor
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Render table
function render() {
  let displayTableEl = document.getElementById("display");
  let tbodyEl = displayTableEl.querySelector("tbody");

  // ✅ Clear old rows in one operation (keep header)
  tbodyEl.innerHTML = "";

  // ✅ Add updated rows
  for (let i = 0; i < myLibrary.length; i++) {
    let rowEl = displayTableEl.insertRow();

    let titleCellEl = rowEl.insertCell(0);
    let authorCellEl = rowEl.insertCell(1);
    let pagesCellEl = rowEl.insertCell(2);
    let wasReadCellEl = rowEl.insertCell(3);
    let deleteCellEl = rowEl.insertCell(4);

    titleCellEl.innerText = myLibrary[i].title;
    authorCellEl.innerText = myLibrary[i].author;
    pagesCellEl.innerText = myLibrary[i].pages;

    const index = i;

    // ✅ Read toggle button
    let readToggleBtnEl = document.createElement("button");
    readToggleBtnEl.className = "btn btn-success";
    readToggleBtnEl.innerText = myLibrary[i].isRead ? "Read" : "Not Read";
    wasReadCellEl.appendChild(readToggleBtnEl);

    readToggleBtnEl.addEventListener("click", function () {
      myLibrary[index].isRead = !myLibrary[index].isRead;
      render();
    });

    // ✅ Delete button
    let deleteBtnEl = document.createElement("button");
    deleteBtnEl.className = "btn btn-warning";
    deleteBtnEl.innerText = "Delete";
    deleteCellEl.appendChild(deleteBtnEl);

    deleteBtnEl.addEventListener("click", function () {
      alert(`You've deleted title: ${myLibrary[index].title}`);
      myLibrary.splice(index, 1);
      render();
    });
  }
}
