import React from "react";
import { Link } from "react-router-dom"
import { Sidenav, Nav, Toggle } from "rsuite"
import { Creative, Branch, AddOutline, PushMessage } from '@rsuite/icons';

/* import "./Sidebar.css" */

export default function Sidebar(props) {
    const [expanded, setExpanded] = React.useState(true)
    const [activeKey, setActiveKey] = React.useState('1')
    function showSidebar() {
        setExpanded(prev => !prev)
    }

    const notesArray = props.notes
    
    const notesElements = notesArray.map((note) => {
        return(
            <Nav.Item
                key={note.id}
                onClick={() => props.setCurrentNoteId(note.id)}            
                >{note.title}
            </Nav.Item>
            )
        })

    return(
    <div className="side" style={expanded ? { width: 240 } : { width: 90 }}>
      <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']}>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
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