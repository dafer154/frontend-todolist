import React, { Component } from 'react'
import UsersService from '../../services/UsersService';
import User from './User';
import Form from 'react-bootstrap/Form'
import './styles/ListUsers.css';
import { Button } from 'react-bootstrap';
import AddUser from './AddUser';

export class ListUsers extends Component {

    state = {
        usersService: new UsersService(),
        users: [],
        usersFiltered: [],
        createuser: false,
        query: '',
        id: '',
        editing: false
    }

    componentDidMount() {
        this.getAllUsers()
    }

    getAllUsers() {
        this.state.usersService.getAllUsers().then((res) => {
            this.setState({ users: res.data.body })
        })
    }

    actionAddUser(e) {
        e.preventDefault();
        console.log("oeee MODAL TASK")
        this.setState({ createuser: true })
    }

    changeShowModal(value) {
        this.setState({ createuser: value, id: "", editing: "" });
    }

    handleChange(e) {
        const query = e.target.value
        this.setState({ query })
        if (query === '') {
            this.getAllUsers();
        }
    }

    searchUser(e) {
        e.preventDefault();
        const allUsers = this.state.users;
        const query = this.state.query

        const userFiltered = allUsers.filter((user) => {
            return user.username.toLowerCase().indexOf(query) !== -1;
        })

        this.setState({ users: userFiltered })
    }

    editUser(id) {
        this.setState({ createuser: true, editing: true, id: id })
    }

    render() {
        const { query, createuser, editing, id, users } = this.state
        return (
            <div className="container-list">
                {createuser ? <AddUser show={createuser} handleShow={(e) => this.changeShowModal(e)} edit={editing} id={id} /> : null}
                <div className="add-task">
                    <Button onClick={(e) => { this.actionAddUser(e) }}>Add User</Button>
                </div>
                <div className="container-search">

                    <form className="form-inline my-2 my-lg-0">
                        <input style={{ width: "85%" }}
                            className="form-control mr-sm-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={query}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <button
                            className="btn btn-outline-success my-2 my-sm-0"
                            type="submit"
                            onClick={(e) => this.searchUser(e)}
                        >
                            Search
              </button>
                    </form>

                </div>
                <div>
                    {users.map((user) => {
                        return (
                            <User key={user._id} user={user} handleEdit={(id) => this.editUser(id)} />
                        )
                    })}
                </div>

            </div>
        )
    }
}

export default ListUsers
