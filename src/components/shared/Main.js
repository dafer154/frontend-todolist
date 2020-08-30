import React from 'react'
import { NavLink } from "react-router-dom";
import Jumbotron from 'react-bootstrap/Jumbotron'

const Main = () => {
    return (
        <Jumbotron>
            <h1>Hello, To Everybody!</h1>
            <p>
                This project is similar to tool Trello, for enlarge the knowledge in ReactJS
            </p>
            <p>
                <NavLink
                    className="btn btn-primary btn-lg"
                    to="/listTasks"
                    role="button"
                >
                    List Tasks!
        </NavLink>
            </p>
        </Jumbotron>
    )
}

export default Main
