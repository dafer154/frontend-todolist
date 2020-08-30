import React from 'react'
import { NavLink } from "react-router-dom";
import Jumbotron from 'react-bootstrap/Jumbotron'

const Main = () => {
    return (
        <Jumbotron>
            <h1>Hello Everyone!</h1>
            <p>
                This project is similar to the widely known tool Trello, and it was made for enlarging my knowledge in ReactJS
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
