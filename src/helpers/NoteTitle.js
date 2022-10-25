import React from 'react';
import { useEffect, useRef } from 'react';

export default function NoteTitle(props) {
    const [editTitle, setEditTitle] = React.useState(false)

    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setEditTitle(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    function handleEdit() {setEditTitle(prev => !prev)}

    return(
        <div>
            <p>Title:</p>
            {editTitle ? (
                <input 
                    autoFocus
                    ref={ref}
                    className='editor--note-title-edit'
                    type="text"
                    id="title"
                    name="title"
                    onChange={props.onChange}
                    value={props.title}>
                    </input>
                ) : (<h1
                        className='editor--note-title'
                        onClick={handleEdit}>
                {props.title}
            </h1>)
            }

        </div>

    )
} 

