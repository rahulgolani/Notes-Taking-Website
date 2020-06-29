// console.log('Inside main.js');
displayNotes();

//grabbing the button->
let addBtn = document.getElementById('addBtn');

//adding an event listener to get the notes from the user and then storing them in localStorage
addBtn.addEventListener('click', function() {
  //grabbing the textarea
  let addTxt = document.getElementById('addTxt');
  let addTitle = document.getElementById('addTitle');
  if (addTxt.value == '') {
    alert('Please Enter the Description');
    return;
  }
  if (addTitle.value == '') {
    alert('Please Enter the Title');
    return;
  }

  //notes is the key in localStorage
  let notes = localStorage.getItem('notes');
  let notesTitle = localStorage.getItem('title');

  //check if there are any notes present or notes is there in localStorage
  if (notes == null) {
    //if no notes the initialize an empty array
    notesObj = [];
    notesTitleObj = [];
  } else {
    //if notes present, then take them in an array
    notesObj = JSON.parse(notes);
    notesTitleObj = JSON.parse(notesTitle);
  }
  //push the new note in array
  notesObj.push(addTxt.value);
  notesTitleObj.push(addTitle.value);
  //update the localStorage
  localStorage.setItem('notes', JSON.stringify(notesObj));
  localStorage.setItem('title', JSON.stringify(notesTitleObj));
  //clear the textarea
  addTxt.value = '';
  addTitle.value = '';
  // console.log(notesObj);
  //using this function to displayNotes
  displayNotes();
})

function displayNotes() {
  //extracting the notes from localStorage
  let notes = localStorage.getItem('notes');
  let notesTitle = localStorage.getItem('title');
  if (notes == null) {
    notesObj = [];
    notesTitleObj = [];
  } else {
    notesObj = JSON.parse(notes);
    notesTitleObj = JSON.parse(notesTitle);
  }
  //creating a separate card for each note
  let html = '';
  notesObj.forEach(function(element, index) {
    html += `

    <div class="noteCard card my-2 mx-2" style="width: 12rem;">
      <div class="card-body">
        <h5 class="card-title">${notesTitleObj[index]}</h5>
        <p class="card-text">${element}</p>
        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
      </div>
    </div>
            `
  });
  //grabbing the div wherein we need to display the notes
  let notesEle = document.getElementById('notes');
  if (notesObj.length != 0) {
    //if notes available then add all the cards to the element
    notesEle.innerHTML = html;
  } else {
    //if notes not present add a user message
    notesEle.innerHTML = `
                <strong> Nothing Here. Use "Add Your Note" section to add the note.</strong>
                      `;
  }
}

function deleteNote(index) {
  //here we recieve the index number of the card to be deleted
  // console.log('deleting', index);
  //getting all the notes
  let notes = localStorage.getItem('notes');
  let notesTitle = localStorage.getItem('title');
  if (notes == null) {
    notesObj = [];
    notesTitleObj = [];
  } else {
    notesObj = JSON.parse(notes)
    notesTitleObj = JSON.parse(notesTitle);
  }
  notesObj.splice(index, 1);
  notesTitleObj.splice(index, 1);
  //deleteds
  //updating the localStorage
  localStorage.setItem('notes', JSON.stringify(notesObj));
  localStorage.setItem('title', JSON.stringify(notesTitleObj));
  displayNotes();
}

//grabbing the search tab
let search = document.getElementById('searchTxt');
//whenever user adds/remove anything this event is fired
search.addEventListener('input', function() {
  //getting the search value. Converting it to lowercase
  let searchValue = search.value.toLowerCase();
  // console.log('input event fired', searchValue);

  //getting all the noteCards
  let cardNotes = document.getElementsByClassName('noteCard');
  // console.log(cardNotes);
  //traversing for each noteCard
  Array.from(cardNotes).forEach(function(element) {
    //getting the noteCard value
    let cardTxt = element.getElementsByTagName('p')[0].innerText;
    //element.getElementsByTagName('p') returns the html collection and the 0 index contains the tag
    // console.log(cardTxt);
    if (cardTxt.includes(searchValue)) {
      element.style.display = 'block'
    } else {
      element.style.display = 'none'
    }
  })
})
// further improvement
// 1) add title done
// 2) mark important
// 3) edit the node
// 4) separate nodes by user
// 5) sync with server and host