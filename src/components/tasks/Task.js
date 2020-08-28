import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './styles/Task.css'

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
                    <strong>{task.status}</strong>
                    <Card.Footer className="footer-custom">
                        <Button variant="primary" onClick={() => this.editTask(task._id)}>Edit</Button>
                        <Button variant="warning">Unassigment</Button>
                    </Card.Footer>
                </Card.Body>
            </Card>
        )
    }
}

export default Task
