import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './styles/Task.css'

export class Task extends Component {

    state = {
        task: this.props.task
    }

    editTask(id) {
        console.log("ID", id)
    }

    listColors(value) {
        switch (value) {
            case 'Open':
                return "primary"
                break;
            case 'In-Progress':
                return "secondary"
                break;
            case 'Completed':
                return "success"
                break;
            case 'Archived':
                return "warning"
                break;
            default:
                break;
        }
    }

    render() {
        const { task } = this.state
        return (
            <Card className="card-custom" border={this.listColors(task.status)} style={{ width: '40rem' }}>
                <Card.Body>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>
                        {task.content}
                    </Card.Text>
                    <strong>{task.status}</strong>
                    <Card.Footer className="footer-custom">
                        <Button variant="primary" onClick={() => this.editTask(task._id)}>Edit</Button>
                        <Button variant="danger">Unassigment</Button>
                    </Card.Footer>
                </Card.Body>
            </Card>
        )
    }
}

export default Task