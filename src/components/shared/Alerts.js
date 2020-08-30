import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'
import './styles/Alerts.css'

export class Alerts extends Component {

    render() {
        return (
            <div className="alert">
                <Alert variant="success">
                    Success!!
                </Alert>
            </div>
        )
    }
}

export default Alerts
