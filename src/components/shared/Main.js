import React from 'react'
import { NavLink } from "react-router-dom";
import Jumbotron from 'react-bootstrap/Jumbotron'

const Main = () => {
    return (
        <Jumbotron>
            <h1>Hello, world!</h1>
            <p>
                This is a simple hero unit, a simple jumbotron-style component for calling
                extra attention to featured content or information.
            </p>
            <p>
                <NavLink
                    className="btn btn-primary btn-lg"
                    to="/createNotes"
                    role="button"
                >
                    List Tasks!
        </NavLink>
            </p>
        </Jumbotron>
    )
}

export default Main
