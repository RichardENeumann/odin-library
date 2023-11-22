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