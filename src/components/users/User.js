import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './styles/User.css'

export class User extends Component {

    state = {
        user: this.props.user
    }

    /**
     * Method that send the variable id to the component parent, 
     * and can edit the user 
     */
    editUser = (id) => {
        this.props.handleEdit(id);
    }

    
    /**
     * Method that send the variable id to the component parent, 
     * and can delete the user 
     */
    deleteUser = (id) => {
        this.props.handleDelete(id);
    }

    render() {
        const { user } = this.state
        return (
            <Card className="card-custom" border="primary" style={{ width: '17rem' }}>
                <Card.Body>
                    <Card.Text><strong>Username: </strong>{user.username}</Card.Text>
                    <Card.Footer className="footer-custom">
                        <Button variant="primary" onClick={() => this.editUser(user._id)}>Edit</Button>
                        <Button variant="danger" onClick={() => this.deleteUser(user._id)}>Delete</Button>
                    </Card.Footer>
                </Card.Body>
            </Card>
        )
    }
}

export default User
