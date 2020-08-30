import React, { Component } from 'react'
import TaskService from '../../services/TasksService';
import UsersService from '../../services/UsersService';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import './styles/AddTask.css';

export class AddTask extends Component {

    state = {
        show: this.props.show,
        taskService: new TaskService(),
        usersService: new UsersService(),
        users: [],
        actionSuccess: false,
        userSelected: "",
        content: "",
        title: "",
        status: "Open",
        date: new Date(),
        listStatus: ['Open', 'In progress', 'Completed', 'Archived'],
        editing: this.props.edit,
        id: this.props.id,
    };

    /**
     * Method for consume API getAllUsers and fill the list
     */
    getAllUsers = () => {
        this.state.usersService.getAllUsers().then((res) => {
            const allUsers = res.data.body;
            this.setState({ users: allUsers, userSelected: allUsers.length !== 0 ? allUsers[0].username : '' })
        })
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
     * Consume API taskId for fill the form and edit task
     */
    taskGetById = () => {
        this.state.taskService.taskGetByid(this.state.id).then((res) => {
            const task = res.data.body
            this.setState({
                userSelected: task.author,
                content: task.content,
                title: task.title,
                status: task.status,
                date: task.date
            })
        })
    }

    /**
     * Method for create or edit Task 
     */
    createTask = (e) => {
        e.preventDefault();
        const newTask = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected,
            status: this.state.status
        };

        if (this.state.editing) {
            this.state.taskService.editsTasks(newTask, this.state.id).then((res) => {
                this.setState({ actionSuccess: true })
                this.handleClose();
            })
                .catch((err) => console.error(err));
        } else {
            this.state.taskService.addTasks(newTask).then((res) => {
                this.setState({ actionSuccess: true })
                this.handleClose();
            })
                .catch((err) => console.error(err));
        }

    };

    componentDidMount() {
        this.getAllUsers();
        if (this.state.id !== '') {
            this.taskGetById();
        } else return false
    }

    render() {

        const { show, editing, users, listStatus, userSelected, status, title, content } = this.state
        return (
            <Modal show={show} onHide={() => this.handleClose()} centered>
                <Modal.Body>
                    <div className="button-close">
                        <Button variant="secondary" className="button-close-custom" onClick={() => this.handleClose()}>X</Button>
                    </div>
                    <div>
                        <div className="card card-body">
                            <h4>{editing ? "Edit Task" : "Create a Task"}</h4>

                            <div className="form-group">
                                <label>User</label>
                                <select
                                    name="userSelected"
                                    id="userSelected"
                                    className="form-control"
                                    value={userSelected}
                                    onChange={this.onInputChange}
                                >
                                    <option disabled selected value> -- select an option -- </option>
                                    {users.map((user) => (
                                        <option value={user.username} key={user._id}>
                                            {user.username}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Status</label>
                                <select
                                    name="status"
                                    id="statusSelected"
                                    className="form-control"
                                    value={status}
                                    onChange={this.onInputChange}
                                >
                                    {listStatus.map((state) => (
                                        <option value={state} key={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    placeholder="Title"
                                    onChange={this.onInputChange}
                                    value={title}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Content</label>
                                <textarea
                                    name="content"
                                    id="content"
                                    cols="5"
                                    rows="5"
                                    className="form-control"
                                    placeholder="Content"
                                    onChange={this.onInputChange}
                                    value={content}
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <form onSubmit={this.createTask}>
                        <button type="submit" className="btn btn-success">Save</button>
                    </form>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddTask
