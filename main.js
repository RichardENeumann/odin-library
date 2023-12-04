"use strict";

class Book {
    #title;
    #author;
    #pages;
    #haveRead;

    constructor(title, author, pages, haveRead) {
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.#haveRead = haveRead;
    }
    get title() { return this.#title; }
    get author() { return this.#author; }
    get pages() { return this.#pages; }
    get haveRead() { return this.#haveRead; }

    toggleRead() {
        this.#haveRead = (this.#haveRead === true) ? false : true;
    }
}

class Library {
    #shelf;

    constructor() {
        this.#shelf = [];
    }
    get shelf() { return this.#shelf; }

    addBook(title, author, pages, haveRead) {
        this.#shelf.push(new Book(title, author, pages, haveRead));
    }
    deleteBook(index) {
        this.#shelf.splice(index, 1);
    }
    render() {
        document.getElementById("display").innerHTML = "";
        let table = document.createElement("table");
        table.innerHTML = 
            "<thead>" + 
            "   <tr>" +
            "       <th>Title</th>" + 
            "       <th></th>" +
            "       <th>Author</th>" + 
            "       <th>Pages</th>" +
            "       <th>Read</th>" +
            "   </tr>" +
            "   <tr>" +
            "       <th></th>" + 
            "       <th><small>(Click to delete)</small></th>" +
            "       <th></th>" + 
            "       <th></th>" +
            "       <th><small>(Click to toggle)</small></th>" +
            "   </tr>" +
            "</thead>" +
            "<tbody id='libTable'>" +
            "</tbody>" +
            "</table>";
        document.getElementById("display").appendChild(table);
    
        this.#shelf.forEach(function(item, index) {
            let tr = document.createElement("tr");
            let title = document.createElement("td");
                title.innerText = item.title;
                tr.appendChild(title);
            let del = document.createElement("td");
            let btDel = document.createElement("button");
                btDel.innerText = "🗑";
                btDel.id = "delete-" + index;
                btDel.addEventListener("click", btDelItem);
                del.appendChild(btDel);
                tr.appendChild(del);
            let author = document.createElement("td");
                author.innerText = item.author;
                tr.appendChild(author);
            let pages = document.createElement("td");
                pages.innerText = item.pages;
                tr.appendChild(pages);
            let haveRead = document.createElement("td");
            let btRead = document.createElement("button");
                btRead.innerText = (item.haveRead === true) ? "✅" : "❌";
                btRead.id = "item-" + index;
                btRead.addEventListener("click", btToggleRead);
                haveRead.appendChild(btRead);
                tr.appendChild(haveRead);
            document.getElementById("libTable").appendChild(tr);
        });

        let button = document.createElement("button");
            button.id = "addBook";
            button.addEventListener("click", btShowModal);
            button.textContent = "Add a book";
        document.getElementById("display").appendChild(button);
    }
}

// DOM interaction with library
function btExpandLibrary(title, author, pages, haveRead) {
    if (
        document.getElementById("title").value != "" &&
        document.getElementById("author").value != "" &&
        document.getElementById("pages").value > 0 && 
        document.getElementById("pages").value != "") {
            myLibrary.addBook(title, author, pages, haveRead);
            myLibrary.render();
    } else {
            alert("Please fill out all necessary Information!");
            btShowModal();
    }
}

function btDelItem(event) {
    myLibrary.deleteBook(event.target.id.match(/\d+/)[0]);
    myLibrary.render();
}

function btToggleRead(event) {
    myLibrary.shelf[event.target.id.match(/\d+/)[0]].toggleRead();
    document.getElementById(event.target.id).innerText = 
        (myLibrary.shelf[event.target.id.match(/\d+/)[0]].haveRead === true) ? "✅" : "❌";
}

// Render modal for adding new book
function btShowModal() {
    document.getElementById("display").innerHTML = 
        "<form id='modal'>" +
        "   <label for='title'>Title:</label>" +
        "   <input type='text' id='title'>" + 
        "   <label for='author'>Author:</label>" +
        "   <input type='text' id='author'>" +
        "   <label for='pages'>Pages:</label>" +
        "   <input type='number' id='pages'>" +
        "   <label for='read'>Have you read it?</label>" +
        "   <input type='checkbox' id='read'>" +
        "   <button type='button' onclick='" +
        "       btExpandLibrary(" + 
        "           document.getElementById(\"title\").value," + 
        "           document.getElementById(\"author\").value," +
        "           document.getElementById(\"pages\").value," +
        "           document.getElementById(\"read\").checked);" + 
        "       '>Add to library</button>" +
        "</form>";
}

const myLibrary = new Library();

// Fill shelf
myLibrary.addBook("Killing Floor", "Lee Child", 525, true);
myLibrary.addBook("A Game of Thrones", "George R.R. Martin", 807, true);
myLibrary.addBook("The Broken Sword", "Poul Anderson", 208, false);

myLibrary.render();