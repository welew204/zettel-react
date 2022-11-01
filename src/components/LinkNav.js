import React from "react";

import TagInput from "../helpers/TagInput";



export default function LinkNav() {
    

    return(
        <section className="linknav">
            <div className="linknav--topics">
                <h2 className="linknav--headers">Topics</h2>
                <div className="linknav--topics-li">
                    <ul>
                        <li>Selected Topic 1</li>
                    </ul>
                    <ul>
                        <li>Possible Link 1</li>
                        <li>Possible Link 2</li>
                        <li>Possible Link 3</li>
                    </ul>
                </div>
            </div>
            <div className="linknav--content">
                <h2 className="linknav--headers">Content</h2>
                <div className="linknav--content-li">
                    <ul className="linknav--content-tags">
                        <TagInput />
                    </ul>
                </div>
            </div>
        </section>
        
    )
}