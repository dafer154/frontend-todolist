import React, { Component } from 'react'
import TasksServices from '../../services/TasksService';
import Task from './Task';
import './styles/ListTask.css';
import { Button } from 'react-bootstrap';
import AddTask from './AddTask';

import { Alerts } from '../shared/Alerts';


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
        notification: false
    }

    componentDidMount() {
        this.getAllTasks()
    }

    /**
     * Allow make a call to the api and classifed the tasks
     */

    getAllTasks() {
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
            const tasksInProgress = tasksAll.filter((task) => task.status === 'In-Progress');
            const tasksArchived = tasksAll.filter((task) => task.status === 'Archived');

            this.setState({ tasksAll, tasksOpen, tasksCompleted, tasksInProgress, tasksArchived })
        })
    }

    /**
     * Allow select the option ['Open', 'In-Progress', 'Archived', 'Completed'] on the checkbox 
     */
    selectStatus(e, label) {
        this.setState({ initialStatus: label, query: '' })
    }

    /*
        Show The component CREATE and EDIT task
    */
    actionAddTask(e) {
        e.preventDefault();
        this.setState({ createtask: true })
    }

    changeShowModal(value, action) {

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

    listStatus() {
        const status = ['Open', 'In-Progress', 'Completed', 'Archived']
        return status.map((state, i) => {
            return (
                <div key={i}>
                    <input
                        type="radio"
                        label={state}
                        value={state}
                        checked={this.state.initialStatus === state}
                        onChange={(e) => this.selectStatus(e, state)}
                    />{state}
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

    handleChange(e) {
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
    searchTask(e) {
        e.preventDefault();
        const status = this.state.initialStatus;
        const allTasks = this.state.tasksAll;
        const query = this.state.query

        switch (status) {
            case 'Open':
                const tasksOpen = allTasks.filter((task) => task.status === 'Open');
                const filteredOpen = tasksOpen.filter((open) => {
                    return open.title.toLowerCase().indexOf(query) !== -1;
                })
                return this.setState({ tasksOpen: filteredOpen })
            case 'In-Progress':
                const tasksInProgress = allTasks.filter((task) => task.status === 'In-Progress');
                const filteredInProgress = tasksInProgress.filter((progress) => {
                    return progress.title.toLowerCase().indexOf(query) !== -1;
                })
                return this.setState({ tasksInProgress: filteredInProgress })
            case 'Completed':
                const tasksCompleted = allTasks.filter((task) => task.status === 'Completed');
                const filteredCompleted = tasksCompleted.filter((completed) => {
                    return completed.title.toLowerCase().indexOf(query) !== -1;
                })
                return this.setState({ tasksCompleted: filteredCompleted })
            case 'Archived':
                const tasksArchived = allTasks.filter((task) => task.status === 'Archived');
                const filteredArchived = tasksArchived.filter((archived) => {
                    return archived.title.toLowerCase().indexOf(query) !== -1;
                })
                return this.setState({ tasksArchived: filteredArchived })
            default:
                break;
        }
    }

    editTask(id) {
        this.setState({ createtask: true, editing: true, id: id })
    }

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

    unassignUser(id) {
        if (window.confirm("Are you sure delete this User in the task?")) {
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
                    <Button onClick={(e) => { this.actionAddTask(e) }}>add Task</Button>
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
                            onClick={(e) => this.searchTask(e)}
                        >
                            Search
                        </button>
                    </form>
                </div>
                <div className="container-status">
                    {this.listStatus()}
                </div>
                {initialStatus === 'Open' ? <div className="wrapp-tasks">
                    {tasksOpen.map((task) => {
                        return (
                            <Task key={task._id} task={task} handleEdit={(id) => this.editTask(id)} handleDelete={(id) => this.deleteTask(id)} handleUnassign={(id) => this.unassignUser(id)} />
                        )
                    })}
                </div> : initialStatus === "In-Progress" ? <div className="wrapp-tasks">
                    {tasksInProgress.map((task) => {
                        return (
                            <Task key={task._id} task={task} handleEdit={(id) => this.editTask(id)} handleDelete={(id) => this.deleteTask(id)} handleUnassign={(id) => this.unassignUser(id)} />
                        )
                    })}
                </div> : initialStatus === "Completed" ? <div className="wrapp-tasks">
                    {tasksCompleted.map((task) => {
                        return (
                            <Task key={task._id} task={task} handleEdit={(id) => this.editTask(id)} handleDelete={(id) => this.deleteTask(id)} handleUnassign={(id) => this.unassignUser(id)} />
                        )
                    })}
                </div> : initialStatus === "Archived" ? <div className="wrapp-tasks">
                    {tasksArchived.map((task) => {
                        return (
                            <Task key={task._id} task={task} handleEdit={(id) => this.editTask(id)} handleDelete={(id) => this.deleteTask(id)} handleUnassign={(id) => this.unassignUser(id)} />
                        )
                    })}
                </div> : null}

            </div>
        )
    }
}

export default ListTasks
