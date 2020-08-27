import React, { Component } from 'react'
import TasksServices from '../../services/TasksService';
import Task from './Task';
import './styles/ListTask.css';
import { Button } from 'react-bootstrap';
import AddTask from './AddTask';


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
        editing: false
    }

    componentDidMount() {
        this.getAllTasks()
    }

    getAllTasks() {
        this.state.tasksService.getAllTasks().then((res) => {


            const tasksAll = res.data.body;
            console.log("add", tasksAll)

            const tasksOpen = tasksAll.filter((task) => task.status === 'Open');
            const tasksCompleted = tasksAll.filter((task) => task.status === 'Completed');
            const tasksInProgress = tasksAll.filter((task) => task.status === 'In-Progress');
            const tasksArchived = tasksAll.filter((task) => task.status === 'Archived');

            this.setState({ tasksAll, tasksOpen, tasksCompleted, tasksInProgress, tasksArchived })
        })
    }


    selectStatus(e, label) {
        this.setState({ initialStatus: label, query: '' })
    }

    actionAddTask(e) {
        e.preventDefault();
        console.log("oeee MODAL TASK")
        this.setState({ createtask: true })
    }

    changeShowModal(value) {
        this.setState({ createtask: value, id: "", editing: "" });
    }

    addTask() {

    }

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


    render() {
        const { query, initialStatus, tasksOpen, tasksInProgress, tasksCompleted, tasksArchived, createtask, editing, id } = this.state
        return (
            <div className="container-list">
                {createtask ? <AddTask show={createtask} handleShow={(e) => this.changeShowModal(e)} edit={editing} id={id} /> : null}
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
                {initialStatus === 'Open' ? <div>
                    {tasksOpen.map((task) => {
                        return (
                            <Task key={task._id} task={task} handleEdit={(id) => this.editTask(id)} />
                        )
                    })}
                </div> : initialStatus === "In-Progress" ? <div>
                    {tasksInProgress.map((task) => {
                        return (
                            <Task key={task._id} task={task} handleEdit={(id) => this.editTask(id)} />
                        )
                    })}
                </div> : initialStatus === "Completed" ? <div>
                    {tasksCompleted.map((task) => {
                        return (
                            <Task key={task._id} task={task} handleEdit={(id) => this.editTask(id)} />
                        )
                    })}
                </div> : initialStatus === "Archived" ? <div>
                    {tasksArchived.map((task) => {
                        return (
                            <Task key={task._id} task={task} handleEdit={(id) => this.editTask(id)} />
                        )
                    })}
                </div> : null}

            </div>
        )
    }
}

export default ListTasks
