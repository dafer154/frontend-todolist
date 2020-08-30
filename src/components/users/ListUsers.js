import React, { Component } from 'react'
import UsersService from '../../services/UsersService';
import User from './User';
import './styles/ListUsers.css';
import { Button } from 'react-bootstrap';
import AddUser from './AddUser';
import { Alerts } from '../shared/Alerts';

export class ListUsers extends Component {

    state = {
        usersService: new UsersService(),
        users: [],
        createuser: false,
        query: '',
        id: '',
        editing: false,
        notification: false
    }

    componentDidMount() {
        this.getAllUsers()
    }

    getAllUsers() {
        this.setState({ users: [] });
        this.state.usersService.getAllUsers().then((res) => {
            this.setState({ users: res.data.body })
        })
    }

    actionAddUser(e) {
        e.preventDefault();
        this.setState({ createuser: true })
    }

    changeShowModal(value, action) {
        this.setState({ createuser: value, id: "", editing: false });
        
        if (action) {
            this.setState({ notification: true })
            setTimeout(() => {
                this.setState({ notification: false })
            }, 2000);
        }
        
        this.getAllUsers();
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
        const query = this.state.query
        this.state.usersService.searchUser(query).then((res) => {
            this.setState({ users: res.data.body })
        })
    }

    editUser(id) {
        this.setState({ createuser: true, editing: true, id: id })
    }

    deleteUser(id) {
        if (window.confirm("Are you sure delete this User?")) {
            this.state.usersService.deleteUser(id).then((res) => {
                this.getAllUsers()
                this.setState({ notification: true })
                setTimeout(() => {
                    this.setState({ notification: false })
                }, 2000);
            })
        }
    }

    render() {
        const { query, createuser, editing, id, users, notification } = this.state
        return (
            <div className="container-list">
                {
                    notification ? <Alerts /> : null
                }
                <div><h1>List Users</h1></div>
                {createuser ? <AddUser show={createuser} handleShow={(e, action) => this.changeShowModal(e, action)} edit={editing} id={id} /> : null}
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
                <div className="wrapp-users">
                    {users.length !== 0 ? users.map((user) => {
                        return (
                            <User key={user._id} user={user} handleDelete={(id) => this.deleteUser(id)} handleEdit={(id) => this.editUser(id)} />
                        )
                    }) : <h5>There are no users to show</h5>}
                </div>

            </div>
        )
    }
}

export default ListUsers
