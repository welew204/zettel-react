import React from 'react';
/* import { BrowserRouter as Router, Routes, Route } from "react-router-dom" */
import './App.css';
import Editor from './components/Editor';
import Sidebar from './components/Sidebar';
import LinkNav from './components/LinkNav';
import Split from "react-split";
import data_temp from "./data_template.json"

function App() {
  const [notes, setNotes] = React.useState(data_temp)
  const [newNoteId, setNewNoteId] = React.useState(0)
  const [currentNoteId, setCurrentNoteId] = React.useState((notes[0] && notes[0].id) || 1)
  
  React.useEffect(() => {
    fetch('http://localhost:8000/api_json', { method: 'get', mode: 'cors' })
    .then(response => {return response.json()})
    .then(data => {
      return setNotes(prev => data.posts)
    }
    )
  }, [])
  
  function saveChanges() {
    fetch('http://localhost:8000/update', { 
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notes),
      mode: 'cors'
    })
    .then(res => res.json())
    .then(data => setNotes(prev => data.posts))
    .catch((error) => {console.error('There has been a problem with your fetch operation:', error)});
    setNewNoteId(0)
  }
  
  function deleteNoteAPI(noteId, ind) {
    fetch(`http://localhost:8000/${noteId}/delete`, { 
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notes[ind].id),
      mode: 'cors'
    })
    .then(console.log(`Dis shit got deleted: ${noteId}`))
    .catch((error) => {console.error('There has been a problem with your fetch operation:', error)});
    setNewNoteId(0)
  }

  function createNote() {setNotes(oldNotes => {
    const nnote = {...data_temp[0]}
    const newNotes = [...oldNotes]
    nnote.id = "u" + newNoteId.toString()
    nnote.title = "TITLE here"
    var tuday = new Date()
    var dd = String(tuday.getDate()).padStart(2, '0');
    var mm = String(tuday.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = tuday.getFullYear();
    tuday = yyyy + '-' + mm + '-' + dd;
    nnote.published = tuday
    /* author will need to be updated w/ current user eventually */
    nnote.author = "WHB"
    newNotes.unshift(nnote)
    setCurrentNoteId(nnote.id)
    setNewNoteId(prev => prev+1)
    
    return newNotes
  })
  }

  React.useEffect(() => {
    setCurrentNoteId((notes[0] && notes[0].id) || 1)
    console.log(`AFTER: ${notes.length}`)
    console.log(`POST- Current ID: ${currentNoteId}`)
    
  }, [notes.length])
  
  function deleteNote(noteId) {
    console.log(`BEFORE: ${notes.length}`)
    console.log(`${noteId}`)
    const targ = notes.find(note => {
      return note.id === currentNoteId
    })
    console.log(targ)
    const ind = notes.indexOf(targ)
    setNotes(prev => prev.filter(item => item !== targ))
    console.log(`PRE- Current ID: ${currentNoteId}`)
    return deleteNoteAPI(noteId, ind)
    /* const byebye = notes.splice(ind) */
  }
  
  function findCurrentNote() {
    /* console.log("finding current note @ ... ", currentNoteId) */
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  }
  
  function updateNotes(text) {setNotes(oldNotes => {
    const newNotes = []
    for (let i = 0; i < oldNotes.length; i++) {
      const oldNote = oldNotes[i];
      if (oldNote.id === currentNoteId) {
        newNotes.unshift({...oldNote, body_md: text})
      }
      else {
        newNotes.push(oldNote)
      }
      }
      return newNotes
  })}

  function updateTitle(text) {setNotes(oldNotes => {
    const newNotes = []
    for (let i = 0; i < oldNotes.length; i++) {
      const oldNote = oldNotes[i];
      if (oldNote.id === currentNoteId) {
        newNotes.unshift({...oldNote, title: text.target.value})
      }
      else {
        newNotes.push(oldNote)
      }
      }
      return newNotes
  })}

  return (
    <div className="app">
      <Sidebar
        notes = {notes}
        currentNote={findCurrentNote()}
        setCurrentNoteId={setCurrentNoteId}
        delete={deleteNote}
      />
      <Split
        sizes={[70, 30]}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={10}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
        className='split'>
        <Editor
          updateTitle={updateTitle}
          createNote={createNote}
          currentNote={findCurrentNote()}
          updateNotes={updateNotes}
          saveNotes={saveChanges}
        />
        <LinkNav/>
      </Split>
    </div>
  );
}

export default App;
