import React from "react";
import ReactMde from "react-mde"
import Showdown from "showdown"
import 'react-mde/lib/styles/css/react-mde-all.css';
import NoteTitle from "../helpers/NoteTitle"



const converter = new Showdown.Converter({
    /* options for flavoring MD can be placed here */
})
/* MY ATTEMPT at combining title into body, but wouldn't display anything...
const startingPoint = `#${props.currentNote.title} \n\n ${props.currentNote.body_md}`
const [toShow, setToShow] = React.useState(startingPoint)
 */
export default function Editor(props) {
    const [selectedTab, setSelectedTab] = React.useState("write");
    


    return(
        <section className="editor">
            <span className="editor--meta">
                <div className="editor--meta-pubDate">
                    <p>Date created:</p>
                    <h3>{props.currentNote.published}</h3>
                </div>
                <div className="editor--meta-author">
                    <p>Author:</p>
                    <h3>{props.currentNote.author}</h3>
                </div>
                <div className="editor--filler"></div>
                <button onClick={props.saveNotes} className="editor--btn" style={props.newNotes > 0 ? {"backgroundColor":"yellow"} : null}>Save Changes</button>
                <button onClick={props.createNote} className="editor--btn">New Note</button>
            </span>
            <NoteTitle
                onChange={props.updateTitle}
                title={props.currentNote.title}
            />
            <ReactMde
                value={props.currentNote.body_md}
                onChange={props.updateNotes}
                minEditorHeight={70}
                heightUnits="vh"
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={markdown => 
                    Promise.resolve(converter.makeHtml(markdown))}
            />
        </section>

    )
}