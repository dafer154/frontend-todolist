import React, { Component } from 'react'
import UsersService from '../../services/UsersService';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import './styles/AddUser.css';

export class AddUser extends Component {

    state = {
        show: this.props.show,
        id: this.props.id,
        editing: this.props.edit,
        usersService: new UsersService(),
        username: '',
        actionSuccess: false,
    }

    /**
     * Change values on the inputs 
     */
    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    /**
        Close the modal, if was success the edit and save send variable action for show the toast
     */
    handleClose = () => {
        this.setState({ show: !this.state.show, id: '', editing: false }, () => {
            this.props.handleShow(this.state.show, this.state.actionSuccess)
        })
    }

    /**
     * Consume API userId for fill the input username
     */

    userGetById = () => {
        this.state.usersService.userGetByid(this.state.id).then((res) => {
            const user = res.data.body
            this.setState({
                username: user.username
            })
        })
    }

    /**
     * Method for create or edit user 
     */
    createUser = (e) => {
        e.preventDefault();
        const newUser = {
            username: this.state.username
        };

        if (this.state.editing) {
            this.state.usersService.editUser(newUser, this.state.id).then((res) => {
                this.setState({ actionSuccess: true })
                this.handleClose();
            })
                .catch((err) => console.error(err));
        } else {
            this.state.usersService.addUsers(newUser).then((res) => {
                this.setState({ actionSuccess: true })
                this.handleClose();
            })
                .catch((err) => console.error(err));
        }

    };

    componentDidMount() {
        if (this.state.id !== '') {
            this.userGetById();
        } else return false
    }

    render() {
        const { show, editing } = this.state
        return (
            <Modal show={show} onHide={() => this.handleClose()}>
                <Modal.Body>
                    <div className="button-close">
                        <Button variant="secondary" className="button-close-custom" onClick={() => this.handleClose()}>X</Button>
                    </div>
                    <div>
                        <div className="card card-body">
                            <h4>{editing ? "Edit User" : "Create a User"}</h4>

                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    placeholder="username"
                                    onChange={this.onInputChange}
                                    value={this.state.username}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <form onSubmit={this.createUser}>
                        <button type="submit" className="btn btn-success">Save</button>
                    </form>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddUser
