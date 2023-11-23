"use strict";

const myLibrary = [];
let displayCache = "";

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.toggleRead = function () {
        this.haveRead = (this.haveRead === true) ? false : true;
    }
}
function addBookToLibrary(title, author, pages, haveRead) {
    myLibrary[myLibrary.length] = new Book(title, author, pages, haveRead);
}

addBookToLibrary("Killing Floor", "Lee Child", 525, true);
addBookToLibrary("A Game of Thrones", "George R.R. Martin", 807, true);
addBookToLibrary("The Broken Sword", "Poul Anderson", 208, false);

function drawLibrary() {
    document.getElementById("display").innerHTML = "";
    let table = document.createElement("table");
    table.innerHTML = 
        "<thead>" + 
        "   <tr>" +
        "       <th>Title</th>" + 
        "       <th>Author</th>" + 
        "       <th>Pages</th>" +
        "       <th>Read</th>" +
        "   </tr>" +
        "</thead>" +
        "<tbody id='libTable'>" +
        "</tbody>" +
        "</table>";
        document.getElementById("display").appendChild(table);

    myLibrary.forEach(function(item, index) {
        let tr = document.createElement("tr");
        let title = document.createElement("td");
            title.innerText = item.title;
            tr.appendChild(title);
        let author = document.createElement("td");
            author.innerText = item.author;
            tr.appendChild(author);
        let pages = document.createElement("td");
            pages.innerText = item.pages;
            tr.appendChild(pages);
        let haveRead = document.createElement("td");
            haveRead.innerText = item.haveRead;
            tr.appendChild(haveRead);
        document.getElementById("libTable").appendChild(tr);
    });
    let button = document.createElement("button");
        button.id = "addBook";
        button.onclick = showModal;
        button.textContent = "Add a book";
    document.body.appendChild(button);
}

function showModal() {
    document.getElementById("addBook").remove();
    document.getElementById("display").innerHTML = 
        "<label for='title'>Title</label>" +
        "<input type='text' id='title'>" + 
        "<label for='author'>Author</label>" +
        "<input type='text' id='author'>" +
        "<label for='Pages'>Pages</label>" +
        "<input type='number' id='pages'>" +
        "<label for='read'>Read it?</label>" +
        "<input type='checkbox' id='read'>" +
        "<button onclick='" +
        "   addBookToLibrary(" + 
        "       document.getElementById(\"title\").value," + 
        "       document.getElementById(\"author\").value," +
        "       document.getElementById(\"pages\").value," +
        "       document.getElementById(\"read\").checked);" + 
        "   drawLibrary();'>Save</button>";
}

drawLibrary();