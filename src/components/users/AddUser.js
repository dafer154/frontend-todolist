import React, { Component } from 'react'
import UsersService from '../../services/UsersService';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

export class AddUser extends Component {

    state = {
        show: this.props.show,
        id: this.props.id,
        editing: this.props.edit,
        usersService: new UsersService(),
        username: ''
    }

    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleClose() {
        this.setState({ show: !this.state.show, id: '', editing: false }, () => {
            this.props.handleShow(this.state.show)
        })
    }

    userGetById() {
        this.state.usersService.userGetByid(this.state.id).then((res) => {
            const user = res.data.body
            this.setState({
                username: user.username
            })
        })
    }

    createUser = (e) => {
        e.preventDefault();
        const newUser = {
            username: this.state.username
        };

        if (this.state.editing) {
            this.state.usersService.editUser(newUser, this.state.id).then((res) => {
                this.handleClose();
            })
                .catch((err) => console.error(err));
        } else {
            this.state.usersService.addUsers(newUser).then((res) => {
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
        const { show } = this.state
        return (
            <Modal show={show} onHide={() => this.handleClose()}>
                <Modal.Body>
                    <div className="col-md-6 offset-md-3">
                        <div className="card card-body">
                            <h4>Create a User</h4>

                            <div className="form-group">
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

                            <form onSubmit={this.createUser}>
                                <button type="submit" className="btn btn-success">
                                    Save
            </button>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleClose()}>
                        Close
          </Button>
                    <Button variant="primary" onClick={() => this.handleClose()}>
                        Save Changes
          </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddUser
