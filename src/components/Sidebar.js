import React from "react";
import { Link } from "react-router-dom"
import { Sidenav, Nav, Toggle } from "rsuite"
import { Creative, Branch, AddOutline, PushMessage} from '@rsuite/icons';
import {TbTrashX} from 'react-icons/tb';

/* import "./Sidebar.css" */

export default function Sidebar(props) {
    const [expanded, setExpanded] = React.useState(true)
    
    function showSidebar() {
        setExpanded(prev => !prev)
    }

    console.log(props.activeKey)
    const notesArray = props.notes
    
    const notesElements = notesArray.map((note) => {
        return(
            <Nav.Item
                key={note.id}
                onClick={() => props.setCurrentNoteId(note.id)}
                className="side--notes-each"
                style={
                  props.currentNote.id === note.id ?
                  {"backgroundColor": "lightgray"} :
                  null
                }>
                  <h4>
                    {note.title}
                  </h4>
                  {props.currentNote.id === note.id ?                   
                  <button 
                    onClick={() => props.delete(note.id)}
                    className="side--notes-trash">
                      <TbTrashX />
                  </button> :
                  null
                }
            </Nav.Item>
            )
        })

    return(
    <div className="side" style={expanded ? { width: 250 } : { width: 90 }}>
      <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']}>
        <Sidenav.Body>
          <Nav activeKey={props.activeKey} onSelect={props.setActiveKey}>
            <Nav.Item eventKey="1" icon={<Creative />}>
              Editor
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<Branch />}>
              Graph View
            </Nav.Item>
            <Nav.Menu className="side--notes" placement="rightStart" eventKey="3" title="Notes" icon={<PushMessage />}>
              {notesElements}
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle expanded={expanded} onToggle={expanded => setExpanded(expanded)} />
      </Sidenav>
    </div>
        
    )
}
/* <Nav.Item eventKey="1">...Where a Note will be listed...</Nav.Item>
<Nav.Item eventKey="2">...</Nav.Item> */
/* needs fnc to leave out drawer */
/* <Nav.Item eventKey={`${index}`}>
    {note.title}
</Nav.Item> */


/* 

*/