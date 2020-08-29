import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'

export class Alerts extends Component {
    
    state={
        message: this.props.message
    }
    
    render() {
        const {message} = this.state
        return (
            <div
                style={{
                    position: 'absolute',
                    top: '77px',
                    left: '97px'
                }}
            >
            <Alert variant="success">
                {/* {message}    */}
                TEST
            </Alert>
            </div>
        )
    }
}

export default Alerts
