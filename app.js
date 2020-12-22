console.log("Welcome to Magic Notes.");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let noteTitle = document.querySelector("#addTitle");
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    let noteTitles = localStorage.getItem("noteTitles");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    if (noteTitles == null) {
        noteTitlesObj = [];
    } else {
        noteTitlesObj = JSON.parse(noteTitles);
    }
    notesObj.push(addTxt.value);
    noteTitlesObj.push(noteTitle.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("noteTitles", JSON.stringify(noteTitlesObj));
    addTxt.value = "";
    noteTitle.value = "";
    showNotes();
});

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    let noteTitles = localStorage.getItem("noteTitles");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    if (noteTitles == null) {
        noteTitlesObj = [];
    } else {
        noteTitlesObj = JSON.parse(noteTitles);
    }
    let html = "";
    let firstPart = [];
    let secondPart = [];
    noteTitlesObj.forEach((element) => {
        let str2 = `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element}</h5>`;
            firstPart.push(str2);
    });
    notesObj.forEach(function (element, index) {
        secondPart.push(`<p class="card-text"> ${element}</p>
        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
    </div>
</div>`);
    });

    for(let i = 0;i<firstPart.length;i++){
        html += firstPart[i]+secondPart[i];
    }

    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

// Function to delete a note
function deleteNote(index) {
    //   console.log("I am deleting", index);
    let notes = localStorage.getItem("notes");
    let noteTitles = localStorage.getItem("noteTitles");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    if (noteTitles == null) {
        noteTitlesObj = [];
    } else {
        noteTitlesObj = JSON.parse(noteTitles);
    }
    notesObj.splice(index, 1);
    noteTitlesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("noteTitles", JSON.stringify(noteTitlesObj));
    showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    let resultsFound = 0;
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("h5")[0].innerText;
        if ((cardTxt.toLowerCase()).includes(inputVal)) {
            element.style.display = "block";
            resultsFound += 1;
        } else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    });
    if (resultsFound<1){
        let notesElme = document.getElementById("notes");
        notesElme.innerHTML = `<h3>No Search Results Found! :(</h3>`;
    }
})

// const impNote = (mainindex) => {
//     let notes = localStorage.getItem("notes");
//     let noteTitles = localStorage.getItem("noteTitles");
//     if (notes == null) {
//         notesObj = [];
//     } else {
//         notesObj = JSON.parse(notes);
//     }
//     if (noteTitles == null) {
//         noteTitlesObj = [];
//     } else {
//         noteTitlesObj = JSON.parse(noteTitles);
//     }
//     let noteCards = document.getElementsByClassName('noteCard');
//     Array.from(noteCards).forEach(function (element,index) {
//         if (index=mainindex) {
//             element.style.color = 'red';
//         }
//     });
// };

/*
Further Features:
1. Add Title - Done
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server
*/

