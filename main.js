"use strict";

const myLibrary = [];

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
    myLibrary.forEach(function (item) {
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
}

drawLibrary();