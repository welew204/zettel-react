import React from "react";
/* import { BrowserRouter as Router, Routes, Route } from "react-router-dom" */
import "./App.css";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import LinkNav from "./components/LinkNav";
import Split from "react-split";
import data_temp from "./data_template.json";
import { format, subDays } from "date-fns";

import BarChart from "./components/BarChart";
import BubbleGraph from "./components/BubbleGraph";
import BubGrph from "./components/FtguBubGraph";
import BG_fake_data from "./helpers/BG_fdata";
import d3FakeData from "./helpers/d3FakeData.json";

function App() {
  const [notes, setNotes] = React.useState(data_temp);
  const [newNoteId, setNewNoteId] = React.useState(0);
  const [needsSave, setNeedsSave] = React.useState(false);
  const [currentNoteId, setCurrentNoteId] = React.useState(notes[0]?.id || 1);
  const [activeKey, setActiveKey] = React.useState("3");

  let initRender = React.useRef(true);

  React.useEffect(() => {
    if (initRender.current) {
      initRender.current = false;
    } else {
      setNeedsSave(true);
    }
  }, [notes]);

  React.useEffect(() => {
    fetch("http://localhost:8000/api_json", { method: "get", mode: "cors" })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return setNotes((prev) => data.posts);
      });
    initRender.current = true;
  }, []);

  function saveChanges(e, current_note) {
    /* console.log(findCurrentNote().id) */
    fetch("http://localhost:8000/update", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notes),
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => setNotes((prev) => data.posts))
      .then(console.log("set notes!"))
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
    initRender.current = true;
    setNeedsSave(false);
    setNewNoteId(0);
  }

  function deleteNoteAPI(noteId, ind) {
    fetch(`http://localhost:8000/${noteId}/delete`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notes[ind].id),
      mode: "cors",
    })
      .then(console.log(`Dis shit got deleted: ${noteId}`))
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
    initRender.current = true; /* bc i'm getting a fresh DB set o notes back */
    setNewNoteId(0);
  }

  function createNote() {
    setNotes((oldNotes) => {
      const nnote = { ...data_temp[0] };
      const newNotes = [...oldNotes];
      nnote.id = "u" + newNoteId.toString();
      nnote.title = "TITLE here";
      const tuday = format(new Date(), "MM-dd-yyyy");
      nnote.published = tuday;
      /* USING date-fns ... TO TEST: console.log(nnote.published) */
      /* author will need to be updated w/ current user eventually */
      nnote.author = "WHB";
      newNotes.unshift(nnote);
      setCurrentNoteId(nnote.id);
      setNewNoteId((prev) => prev + 1);

      return newNotes;
    });
  }

  /* this is silly, bc it just is effective when post is deleted, 
  but also fires when new post gets added (when THAT post should be the currentNote) 
  also getting a LINT warning--> fix at some point!*/
  React.useEffect(() => {
    setCurrentNoteId((notes[0] && notes[0].id) || 1);
  }, [notes.length]);

  function deleteNote(noteId) {
    const targ = notes.find((note) => {
      return note.id === currentNoteId;
    });
    const ind = notes.indexOf(targ);
    setNotes((prev) => prev.filter((item) => item !== targ));
    return deleteNoteAPI(noteId, ind);
    /* const byebye = notes.splice(ind) */
  }

  function findCurrentNote() {
    /* console.log("finding current note @ ... ", currentNoteId) */
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  function updateNotes(text) {
    setNotes((oldNotes) => {
      const newNotes = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          newNotes.unshift({ ...oldNote, body_md: text });
        } else {
          newNotes.push(oldNote);
        }
      }
      return newNotes;
    });
  }

  function updateTitle(text) {
    setNotes((oldNotes) => {
      const newNotes = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          newNotes.unshift({ ...oldNote, title: text.target.value });
        } else {
          newNotes.push(oldNote);
        }
      }
      return newNotes;
    });
  }

  const view = () => {
    if (activeKey === "2") {
      return (
        /* put D3 component HERE */
        <BubbleGraph data={BG_fake_data} />
      );
    } else {
      return (
        <Editor
          newNotes={newNoteId}
          needsSave={needsSave}
          updateTitle={updateTitle}
          createNote={createNote}
          currentNote={findCurrentNote()}
          updateNotes={updateNotes}
          saveNotes={() => saveChanges(notes[currentNoteId])}
        />
      );
    }
  };

  return (
    <div className='app'>
      <Sidebar
        notes={notes}
        currentNote={findCurrentNote()}
        setCurrentNoteId={setCurrentNoteId}
        delete={deleteNote}
        activeKey={activeKey}
        setActiveKey={setActiveKey}
      />
      <Split
        sizes={[70, 30]}
        minSize={[600, 300]}
        gutterSize={10}
        gutterAlign='center'
        snapOffset={10}
        dragInterval={1}
        direction='horizontal'
        cursor='col-resize'
        className='split'>
        <div>{view()}</div>
        <div>
          <LinkNav />
        </div>
      </Split>
    </div>
  );
}

export default App;
