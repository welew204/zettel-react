<div>
            <Nav vertical >
                {/* deleted: expanded={false} from Nav declamation */}
                <Nav.Item eventKey="1" icon={<Creative />}>
                    Editor
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<Branch />}>
                    Graph View
                </Nav.Item>
                <Nav.Item eventKey="3" onClick={showSidebar} icon={<PushMessage/>}>
                    Notes
                </Nav.Item>
            </Nav>
            <Sidenav className={expanded ? "side--notes-drawer-active" : "side--notes-drawer"} expanded={expanded}>
                <Sidenav.Body>
                    <Nav >
                        <Nav.Menu 
                            eventKey="3"
                            placement="rightStart"
                            title="Notes">
                            {notesElements}
                        </Nav.Menu>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>