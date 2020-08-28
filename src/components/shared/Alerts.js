import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'

export class Alerts extends Component {
    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: '77px',
                    left: '97px'
                }}
            >
            <Alert variant="success">
                    This is a success alert—check it out!
            </Alert>
            </div>
        )
    }
}

export default Alerts
