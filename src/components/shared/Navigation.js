import React from 'react'
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink className="navbar-brand" to="/">
                    To Do List
          </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" activeClassName="active">
                                Home
                </NavLink>
                        </li>
                        {/* <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/createNotes"
                  activeClassName="active"
                >
                  Create Notes
                </NavLink>
              </li> */}
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/listTasks"
                                activeClassName="active"
                            >
                                List Tasks
                </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/listUsers"
                                activeClassName="active"
                            >
                                List Users
                </NavLink>
                        </li>
                        {/* <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/createUsers"
                  activeClassName="active"
                >
                  Create Users
                </NavLink>
              </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
