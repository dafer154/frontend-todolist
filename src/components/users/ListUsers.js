import React, { Component } from 'react'
import UsersService from '../../services/UsersService';

export class ListUsers extends Component {

    state = {
        usersService: new UsersService(),
        users: []
    }

    componentDidMount() {
        this.getAllUsers()
    }

    getAllUsers() {
        this.state.usersService.getAllUsers().then((res) => {
            console.log("USERS", res);
        })
    }

    render() {
        return (
            <div>
                <h1>List Users</h1>
            </div>
        )
    }
}

export default ListUsers
