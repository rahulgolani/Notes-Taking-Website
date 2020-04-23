// console.log('Inside main.js');
displayNotes();

//grabbing the button->
let addBtn = document.getElementById('addBtn');

//adding an event listener to get the notes from the user and then storing them in localStorage
addBtn.addEventListener('click', function() {
  //grabbing the textarea
  let addTxt = document.getElementById('addTxt');

  //notes is the key in localStorage
  let notes = localStorage.getItem('notes');

  //check if there are any notes present
  if (notes == null) {
    //if no notes the initialize an empty array
    notesObj = [];
  } else {
    //if notes present, then take them in an array
    notesObj = JSON.parse(notes)
  }
  //push the new note in array
  notesObj.push(addTxt.value);
  //update the localStorage
  localStorage.setItem('notes', JSON.stringify(notesObj));
  //clear the textarea
  addTxt.value = '';
  // console.log(notesObj);
  //using this function to displayNotes
  displayNotes();
})

function displayNotes() {
  //extracting the notes from localStorage
  let notes = localStorage.getItem('notes');
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes)
  }
  //creating a separate card for each note
  let html = '';
  notesObj.forEach(function(element, index) {
    html += `

    <div class="noteCard card my-2 mx-2" style="width: 12rem;">
      <div class="card-body">
        <h5 class="card-title">Note ${index+1}</h5>
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
  // console.log('deleting', index);
  let notes = localStorage.getItem('notes');
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes)
  }
  notesObj.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notesObj));
  displayNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener('input', function() {
  let searchValue = search.value.toLowerCase();
  // console.log('input event fired', searchValue);

  let cardNotes = document.getElementsByClassName('noteCard');
  Array.from(cardNotes).forEach(function(element) {
    let cardTxt = element.getElementsByTagName('p')[0].innerText;
    // console.log(cardTxt);
    if (cardTxt.includes(searchValue)) {
      element.style.display = 'block'
    } else {
      element.style.display = 'none'
    }
  })
})
// further improvement
// 1) add title
// 2) mark important
// 3) edit the node
// 4) separate nodes by user
// 5) sync with server and host