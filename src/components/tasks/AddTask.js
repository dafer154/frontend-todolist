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
        userSelected: "",
        content: "",
        title: "",
        status: "Open",
        date: new Date(),
        listStatus: ['Open', 'In-progress', 'Completed', 'Archived'],
        editing: this.props.edit,
        id: this.props.id,
    };


    getAllUsers() {
        this.state.usersService.getAllUsers().then((res) => {
            const allUsers = res.data.body;
            this.setState({ users: allUsers, userSelected: allUsers[0].username })
        })
    }

    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleClose() {
        this.setState({ show: !this.state.show, id: '', editing: false }, () => {
            this.props.handleShow(this.state.show)
        })
    }

    taskGetById() {
        this.state.taskService.taskGetByid(this.state.id).then((res) => {

            const task = res.data.body
            console.log(task);
            this.setState({
                userSelected: task.author,
                content: task.content,
                title: task.title,
                status: task.status,
                date: task.date
            })
        })
    }

    createNote = (e) => {
        e.preventDefault();
        const newTask = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected,
            status: this.state.status
        };

        if (this.state.editing) {
            console.log("oooooeee EDIT");
            this.state.taskService.editsTasks(newTask, this.state.id).then((res) => {
                console.log(res);
                this.handleClose();
            })
            .catch((err) => console.error(err));
        } else {
            this.state.taskService.addTasks(newTask)
                .then((res) => {
                    console.log(res);
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

    //   getNotesById = (id) => {
    //     this.state.notesService
    //       .getNoteById(id)
    //       .then((res) => {
    //         console.log(res);
    //         const note = res.data.body;
    //         this.setState({
    //           editing: true,
    //           _id: note._id,
    //           userSelected: note.author,
    //           content: note.content,
    //           title: note.title,
    //           date: new Date(note.date),
    //         });
    //       })
    //       .catch((err) => console.error(err));
    //   };

    render() {

        const { show, editing } = this.state
        console.log("EDITING", editing);
        return (
            <Modal show={show} onHide={() => this.handleClose()}>
                <Modal.Body>
                    <div className="button-close">

                        <Button variant="secondary" className="button-close-custom" onClick={() => this.handleClose()}>
                            X
          </Button>
                    </div>
                    <div>
                        <div className="card card-body">
                            <h4>Create a Task</h4>

                            <div className="form-group">
                                <select
                                    name="userSelected"
                                    id="userSelected"
                                    className="form-control"
                                    value={this.state.userSelected}
                                    onChange={this.onInputChange}
                                >
                                    {this.state.users.map((user) => (
                                        <option value={user.username} key={user._id}>
                                            {user.username}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <select
                                    name="status"
                                    id="statusSelected"
                                    className="form-control"
                                    value={this.state.status}
                                    onChange={this.onInputChange}
                                >
                                    {this.state.listStatus.map((state) => (
                                        <option value={state} key={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    placeholder="Title"
                                    onChange={this.onInputChange}
                                    value={this.state.title}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <textarea
                                    name="content"
                                    id="content"
                                    cols="5"
                                    rows="5"
                                    className="form-control"
                                    placeholder="Content"
                                    onChange={this.onInputChange}
                                    value={this.state.content}
                                    required
                                ></textarea>
                            </div>

                            {/* <div className="form-group">
                                <Datepicker
                                    className="form-control w-100"
                                    selected={this.state.date}
                                    onChange={this.onChangeDate}
                                    value={this.state.date}
                                ></Datepicker>
                            </div> */}


                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <form onSubmit={this.createNote}>
                        <button type="submit" className="btn btn-success">Save</button>
                    </form>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddTask
