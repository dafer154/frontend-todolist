import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './styles/Task.css'
import Badge from 'react-bootstrap/Badge'
import { format } from "timeago.js";

export class Task extends Component {

    state = {
        task: this.props.task
    }

    editTask(id) {
        this.props.handleEdit(id);
    }

    deleteTask(id) {
        this.props.handleDelete(id);
    }

    unassignUser(id) {
        this.props.handleUnassign(id);
    }

    listColors(value) {
        switch (value) {
            case 'Open':
                return "primary"
            case 'In-Progress':
                return "secondary"
            case 'Completed':
                return "success"
            case 'Archived':
                return "warning"
            default:
                break;
        }
    }

    render() {
        const { task } = this.state
        return (
            <Card className="card-custom text-left" border={this.listColors(task.status)} style={{ width: '17rem' }}>
                <Card.Body>
                    <Card.Title>
                        <div className="custom-title">
                            <div>{task.title}</div>
                            <div><Button onClick={() => this.deleteTask(task._id)} className="custom-delete" variant="danger">X</Button></div>
                        </div>
                    </Card.Title>
                    <Card.Text>
                        {task.content}
                    </Card.Text>
                    <div>

                        <strong>Status: </strong><Badge variant={this.listColors(task.status)}>{task.status}</Badge>
                    </div>
                    <div>

                        <strong>Author: </strong><span>{task.author}</span>
                    </div>
                    <div>

                        <strong>Date: </strong><span>{format(task.date)}</span>
                    </div>
                    <Card.Footer className="footer-custom">
                        <Button variant="primary" onClick={() => this.editTask(task._id)}>Edit</Button>
                        <Button variant="warning" onClick={() => this.unassignUser(task._id)}>Unassigment</Button>
                    </Card.Footer>
                </Card.Body>
            </Card>
        )
    }
}

export default Task
