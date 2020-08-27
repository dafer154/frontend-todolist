import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './styles/User.css'

export class User extends Component {

    state = {
        user: this.props.user
    }

    editUser(id) {
        this.props.handleEdit(id);
    }

    render() {
        const { user } = this.state
        return (
            <Card className="card-custom" border="primary" style={{ width: '40rem' }}>
                <Card.Body>
                    <Card.Title>{user.username}</Card.Title>
                    <Card.Footer className="footer-custom">
                        <Button variant="primary" onClick={() => this.editUser(user._id)}>Edit</Button>
                        <Button variant="danger">Delete</Button>
                    </Card.Footer>
                </Card.Body>
            </Card>
        )
    }
}

export default User
