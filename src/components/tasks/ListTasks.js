import React, { Component } from 'react'
import TasksServices from '../../services/TasksService';
import Task from './Task';
import './styles/ListTask.css';
import { Button } from 'react-bootstrap';
import AddTask from './AddTask';
import Alerts from '../shared/Alerts';

export class ListTasks extends Component {

    state = {
        tasksService: new TasksServices(),
        initialStatus: 'Open',
        tasksAll: [],
        tasksOpen: [],
        tasksCompleted: [],
        tasksArchived: [],
        tasksInProgress: [],
        createtask: false,
        query: '',
        id: '',
        editing: false,
        notification: false,
        messageAlert: ''
    }

    componentDidMount() {
        this.getAllTasks()
    }

    /**
     * Allow make a call to the api and classifed the tasks
     */

    getAllTasks = () => {
        this.setState({
            tasksAll: [],
            tasksOpen: [],
            tasksCompleted: [],
            tasksArchived: [],
            tasksInProgress: []
        });
        this.state.tasksService.getAllTasks().then((res) => {

            const tasksAll = res.data.body;
            const tasksOpen = tasksAll.filter((task) => task.status === 'Open');
            const tasksCompleted = tasksAll.filter((task) => task.status === 'Completed');
            const tasksInProgress = tasksAll.filter((task) => task.status === 'In progress');
            const tasksArchived = tasksAll.filter((task) => task.status === 'Archived');

            this.setState({ tasksAll, tasksOpen, tasksCompleted, tasksInProgress, tasksArchived })
        })
    }

    /**
     * Allow select the option ['Open', 'In-Progress', 'Archived', 'Completed'] on the checkbox 
     */
    selectStatus = (e, label) => {
        this.setState({ initialStatus: label, query: '' })
    }

    /*
        Show The component CREATE and EDIT task
    */
    actionAddTask = (e) => {
        e.preventDefault();
        this.setState({ createtask: true })
    }

    changeShowModal = (value, action) => {

        //Set values to emptys
        this.setState({ createtask: value, id: "", editing: false });

        //If you create or edit SUCCESS show the TOAST
        if (action) {
            this.setState({ notification: true })
            setTimeout(() => {
                this.setState({ notification: false })
            }, 2000);
        }

        //Call to method for set the new state of all the TASKS
        this.getAllTasks();
    }


    /**
     * List of the checkbox ['Open', 'In-Progress', 'Completed', 'Archived']
     */

    listStatus = () => {
        const status = ['Open', 'In progress', 'Completed', 'Archived']
        return status.map((state, i) => {
            return (
                <div key={i}>
                    <input
                        style={{ marginRight: '8px' }}
                        type="radio"
                        label={state}
                        value={state}
                        checked={this.state.initialStatus === state}
                        onChange={(e) => this.selectStatus(e, state)}
                    /><label>{state}</label>
                </div>
            )
        })
    }

    /**
     * 
     * @param {e} 
     * change of state for value query, if it's empty call function
     * getAllTasks() for field all the tasks
     */

    handleChange = (e) => {
        const query = e.target.value
        this.setState({ query })
        if (query === '') {
            this.getAllTasks();
        }
    }

    /**
     * 
     * @param {e}
     * Function allow search a task when you make a click or enter in the button
     */
    searchTask = (e) => {
        e.preventDefault();
        const status = this.state.initialStatus;
        const query = this.state.query

        switch (status) {
            case 'Open':
                this.state.tasksService.searchTask(query, status).then((res) => {
                    const filteredOpen = res.data.body;
                    this.setState({ tasksOpen: filteredOpen })
                })
                break
            case 'In progress':
                this.state.tasksService.searchTask(query, status).then((res) => {
                    const filteredInProgress = res.data.body;
                    this.setState({ tasksInProgress: filteredInProgress })
                })
                break
            case 'Completed':
                this.state.tasksService.searchTask(query, status).then((res) => {
                    const filteredCompleted = res.data.body;
                    this.setState({ tasksCompleted: filteredCompleted })
                })
                break
            case 'Archived':
                this.state.tasksService.searchTask(query, status).then((res) => {
                    const filteredArchived = res.data.body;
                    this.setState({ tasksArchived: filteredArchived })
                })
                break
            default:
                break;
        }
    }

    /**
     * Method that conditions if you stay editing a Task, and set the variable id 
     */
    editTask = (id) => {
        this.setState({ createtask: true, editing: true, id: id })
    }

    /**
     * Method for call the API Delete Tasks
    */
    deleteTask = (id) => {
        if (window.confirm("Are you sure delete this Task?")) {
            this.state.tasksService.deleteTask(id).then((res) => {
                this.getAllTasks()
                this.setState({ notification: true })
                setTimeout(() => {
                    this.setState({ notification: false })
                }, 2000);
            })
        };
    }


    /**
     * Method that allow unassign a User in a Task 
     */
    unassignUser = (id) => {
        if (window.confirm("Do you want to delete the user assigned?")) {
            this.state.tasksService.unassignUser(id).then((res) => {
                this.getAllTasks()
                this.setState({ notification: true })
                setTimeout(() => {
                    this.setState({ notification: false })
                }, 2000);
            })
        }
    }


    render() {
        const { query,
            initialStatus,
            tasksOpen,
            tasksInProgress,
            tasksCompleted,
            tasksArchived,
            createtask,
            editing,
            id,
            notification } = this.state
        return (
            <div className="container-list">
                {
                    notification ? <Alerts /> : null
                }
                <div><h1>List Tasks</h1></div>
                {createtask ? <AddTask show={createtask} handleShow={(e, action) => this.changeShowModal(e, action)} edit={editing} id={id} /> : null}
                <div className="add-task">
                    <Button onClick={(e) => { this.actionAddTask(e) }}>Add Task</Button>
                </div>
                <div className="container-search">
                    <form className="form-inline my-2 my-lg-0">
                        <input style={{ width: "85%" }}
                            className="form-control mr-sm-2"
                            type="search"
                            placeholder="Search by Title"
                            aria-label="Search"
                            value={query}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <button
                            className="btn btn-outline-success my-2 my-sm-0"
                            type="submit"
                            onClick={(e) => this.searchTask(e)}
                        >
                            Search
                        </button>
                    </form>
                </div>
                <div className="container-status">
                    {this.listStatus()}
                </div>
                {initialStatus === 'Open' && tasksOpen.length !== 0 ? <div className="wrapp-tasks">
                    {tasksOpen.map((task) => {
                        return (
                            <Task key={task._id} task={task} handleEdit={(id) => this.editTask(id)} handleDelete={(id) => this.deleteTask(id)} handleUnassign={(id) => this.unassignUser(id)} />
                        )
                    })}
                </div> : initialStatus === "In progress" && tasksInProgress.length !== 0 ? <div className="wrapp-tasks">
                    {tasksInProgress.map((task) => {
                        return (
                            <Task key={task._id} task={task} handleEdit={(id) => this.editTask(id)} handleDelete={(id) => this.deleteTask(id)} handleUnassign={(id) => this.unassignUser(id)} />
                        )
                    })}
                </div> : initialStatus === "Completed" && tasksCompleted.length !== 0 ? <div className="wrapp-tasks">
                    {tasksCompleted.map((task) => {
                        return (
                            <Task key={task._id} task={task} handleEdit={(id) => this.editTask(id)} handleDelete={(id) => this.deleteTask(id)} handleUnassign={(id) => this.unassignUser(id)} />
                        )
                    })}
                </div> : initialStatus === "Archived" && tasksArchived.length !== 0 ? <div className="wrapp-tasks">
                    {tasksArchived.map((task) => {
                        return (
                            <Task key={task._id} task={task} handleEdit={(id) => this.editTask(id)} handleDelete={(id) => this.deleteTask(id)} handleUnassign={(id) => this.unassignUser(id)} />
                        )
                    })}
                </div> : <h5>There are no tasks to show</h5>}

            </div>
        )
    }
}

export default ListTasks
