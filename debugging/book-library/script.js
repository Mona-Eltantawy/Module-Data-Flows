let myLibrary = [];

window.addEventListener("load", function () {
  populateStorage();
});

function populateStorage() {
  if (myLibrary.length === 0) {
    let book1 = new Book("Robinson Crusoe", "Daniel Defoe", "252", true);
    let book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      "127",
      true
    );

    myLibrary.push(book1, book2);
    render();
  }
}

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const check = document.getElementById("check");

// Add book
function submit() {
  // ✅ Validation
  if (!title.value || !author.value || !pages.value) {
    alert("Please fill all fields!");
    return;
  }

  // ✅ Create and store book
  let book = new Book(title.value, author.value, pages.value, check.checked);
  myLibrary.push(book);

  // ✅ Reset form
  title.value = "";
  author.value = "";
  pages.value = "";
  check.checked = false;

  render();
}

// Book constructor
function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

// Render table
function render() {
  let table = document.getElementById("display");

  // ✅ Clear old rows (keep header)
  for (let i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }

  // ✅ Add updated rows
  for (let i = 0; i < myLibrary.length; i++) {
    let row = table.insertRow();

    let titleCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let pagesCell = row.insertCell(2);
    let wasReadCell = row.insertCell(3);
    let deleteCell = row.insertCell(4);

    titleCell.innerText = myLibrary[i].title;
    authorCell.innerText = myLibrary[i].author;
    pagesCell.innerText = myLibrary[i].pages;

    const index = i;

    // ✅ Read toggle button
    let changeBut = document.createElement("button");
    changeBut.className = "btn btn-success";
    changeBut.innerText = myLibrary[i].check ? "Read" : "Not Read";
    wasReadCell.appendChild(changeBut);

    changeBut.addEventListener("click", function () {
      myLibrary[index].check = !myLibrary[index].check;
      render();
    });

    // ✅ Delete button
    let delButton = document.createElement("button");
    delButton.className = "btn btn-warning";
    delButton.innerText = "Delete";
    deleteCell.appendChild(delButton);

    delButton.addEventListener("click", function () {
      alert(`You've deleted title: ${myLibrary[index].title}`);
      myLibrary.splice(index, 1);
      render();
    });
  }
}
