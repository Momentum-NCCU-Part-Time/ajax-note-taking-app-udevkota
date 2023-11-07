//OOP
const app = {
  data: {
    url: "http://localhost:3000/notes/",
    notes: []
  },

  /* methods */
  getNotes: function() {
    //GET request: adds the database note objects into the notes array
    //calls generatNotesHTML() method to display the data received 
    fetch(this.data.url, {
      method: 'GET',
      headers: {"Content-Type": "application/json"}
    })
    .then(r => r.json())
    .then(response => {
      for (let note of response) {
        this.data.notes.push(note)
      };
      this.generateNotesHTML()
    }
    )
  },

  createNote: function() {
    // POST request: add input values into request body, return response data and add to DOM using getNotes() method  
    let titleInput = document.getElementById("inputTitle").value
    let textInput = document.getElementById("inputText").value
    let addNoteObj = {
      title: titleInput,
      body: textInput
    }
    fetch('http://localhost:3000/notes/', {
      method: 'POST', 
      headers: {"Content-Type": "application/json"}, 
      body: JSON.stringify(addNoteObj)
    })
    .then(r => r.json())
    .then(response => {
      location.reload()
      this.getNotes()
    })
  },

  displayCreateForm: function() {
    /* displays form */
  },

  deleteNote: function(noteId) {
    /* DELETE request: send id of note object that will be deleted, refresh the page and send GET request*/
    fetch(this.data.url + noteId, {
      method: 'DELETE',
      headers: {"Content-Type": "application/json"}
    })
    .then(r => r.json())
    .then(response => {
      location.reload()
      this.getNotes()
    })
    
  },

  //Spicy
  // confirmDelete: function() {
  //   /* display confirmation popup, call deleteNote(noteId) */
  // },

  editNote: function(noteId) {
    /* call displayEditForm(), saves/overwrites note (request) */
    // let editedTitle = document.getElementById("editTitle").value;
    // let editedBody = document.getElementById("editBody").value;
    // let updateNoteObj = {
    //   title: editedTitle,
    //   body: editedBody
    // }
    fetch(this.data.url + noteId, {
      method: 'PATCH',
      headers: {"Content-Type": "application/json"}
      body: JSON.stringify(updateNoteObj)
    })
    .then(r => r.json())
    .then(response => {
      location.reload()
      this.getNotes()
    })
    
  },

  displayEditForm: function(note) {
    //display the edit form for the note 
    let form = document.getElementById('editForm');
    form.classList.remove('hidden')


  },

  generateNotesHTML: function() {
    const container = document.getElementById('container');
    for (let note of this.data.notes) {
      container.innerHTML += `
        <div class="noteCard">
          <div>${note.title}</div>
          <div>${note.body}</div>
          <button class="editButton" data-id=${note.id}>EDIT</button>
          <button class="deleteButton" data-id=${note.id}>DELETE</button>
        </div>
      `}
      //<div>${note.dateTime}</div>
    this.addEventListeners();
  },

  addEventListeners: function() {
    let deleteButtons = document.querySelectorAll(".deleteButton");
    for (let button of deleteButtons) {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        this.deleteNote(button.dataset.id);
      })
    }
    //add EL for edit note => this.editNote(button.dataset.id)
    let editButtons = document.querySelectorAll(".editButton");
    for (let button of editButtons) {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        this.editNote(button.dataset.id);
      })
    }
  },

  main: function() {
    /* call getNotes(), set up event listeners (will contain if statements, or other code to call when a user clicks edit, delete, or create) - use event.preventDefault(); */
    /* EVENT LISTENER:
        editNote(event.target.data-id)
    */

    this.getNotes();
    
  }
}

app.main()

//IP
