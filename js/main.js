// console.log('Inside main.js');
displayNotes();
//grabbing the button->

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function() {
  let addTxt = document.getElementById('addTxt');
  let notes = localStorage.getItem('notes');

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes)
  }
  notesObj.push(addTxt.value);
  localStorage.setItem('notes', JSON.stringify(notesObj));
  addTxt.value = '';
  console.log(notesObj);
  displayNotes();
})

function displayNotes() {
  let notes = localStorage.getItem('notes');
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes)
  }
  let html = '';
  notesObj.forEach(function(element, index) {
    html += `

    <div class="noteCard card my-2 mx-2" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Note ${index+1}</h5>
        <p class="card-text">${element}</p>
        <button class="btn btn-primary">Delete Note</button>
      </div>
    </div>
            `
  });
  let notesEle = document.getElementById('notes');
  if (notesObj.length != 0) {
    notesEle.innerHTML = html;
  } else {
    notesEle.innerHTML = `
                <strong> Nothing Here. Use "Add Your Note" section to add the note.</strong>
                      `;
  }
}